defmodule Bloomchain.Content.Post do
  import Ecto.Changeset
  import Ecto.Query

  require Slugger

  use Ecto.Schema
  use Arc.Ecto.Schema

  alias Bloomchain.Content.{Tag, Media, Author}
  alias BloomchainWeb.Uploaders.File
  alias Bloomchain.Repo

  @derive {Phoenix.Param, key: :slug}

  def fetch(term, key) do
    term
    |> Map.from_struct()
    |> Map.fetch(key)
  end

  schema "posts" do
    field(:slug, :string)
    field(:title, :string)
    field(:body, :string)
    field(:lead, :string)
    field(:type, :string)
    field(:status, :string)
    field(:time, :integer)
    field(:total_views, :integer)
    field(:seo_settings, :map)

    # belongs_to(:user, User)
    belongs_to(:cover, Media, foreign_key: :cover_id)

    many_to_many(
      :tags,
      Tag,
      join_through: "posts_tags",
      on_replace: :delete,
      on_delete: :delete_all
    )

    many_to_many(
      :authors,
      Author,
      join_through: "posts_authors",
      on_replace: :delete,
      on_delete: :delete_all
    )

    timestamps()
    field(:published_at, :naive_datetime)
  end

  @required_fields ~w(title type)a
  @optional_fields ~w(id slug body lead type status time cover_id published_at total_views seo_settings)a

  def changeset(post, attrs) do
    post
    |> common_changeset(attrs)
  end

  def common_changeset(changeset, attrs) do
    changeset
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_length(:title, min: 3)
    |> process_slug
    |> unique_constraint(:uniq_slug_with_type, name: :uniq_slug_with_type)
    |> process_tags(attrs[:tags])
    |> process_authors(attrs[:authors])
    |> process_seo()
    |> process_published()
  end

  # Private

  defp process_slug(%Ecto.Changeset{valid?: true, changes: %{title: title} = changes} = changeset) do
    put_change(changeset, :slug, changes[:slug] || Slugger.slugify_downcase(title))
  end

  defp process_slug(changeset), do: changeset

  defp process_published(
         %Ecto.Changeset{valid?: true, changes: %{status: "published"} = changes} = changeset
       ) do
    put_change(
      changeset,
      :published_at,
      changes[:published_at] || NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
    )
  end

  defp process_published(
         %Ecto.Changeset{valid?: true, changes: %{status: "ready"} = changes} = changeset
       ) do
    put_change(changeset, :published_at, changes[:published_at])
  end

  defp process_published(%Ecto.Changeset{valid?: true, changes: %{status: _}} = changeset) do
    put_change(changeset, :published_at, nil)
  end

  defp process_published(changeset), do: changeset

  defp process_tags(%Ecto.Changeset{valid?: true} = changeset, [%Tag{} | _] = tags) do
    changeset
    |> put_assoc(:tags, Enum.map(tags, tags))
  end

  defp process_tags(%Ecto.Changeset{valid?: true} = changeset, [%{id: _} | _] = tags) do
    changeset
    |> put_assoc(:tags, Enum.map(tags, &%Tag{id: &1[:id]}))
  end

  defp process_tags(%Ecto.Changeset{valid?: true} = changeset, tags) do
    tags = Repo.all(from(t in Tag, where: t.id in ^tags))

    changeset |> put_assoc(:tags, tags)
  end

  defp process_tags(changeset, _), do: changeset

  defp process_authors(%Ecto.Changeset{valid?: true} = changeset, [%Author{} | _] = authors) do
    changeset
    |> put_assoc(:authors, Enum.map(authors, authors))
  end

  defp process_authors(%Ecto.Changeset{valid?: true} = changeset, [%{id: _} | _] = authors) do
    changeset
    |> put_assoc(:authors, Enum.map(authors, &%Author{id: &1[:id]}))
  end

  defp process_authors(%Ecto.Changeset{valid?: true} = changeset, authors) do
    authors = Repo.all(from(t in Author, where: t.id in ^authors))

    changeset |> put_assoc(:authors, authors)
  end

  defp process_authors(changeset, _), do: changeset

  defp process_seo(
         %Ecto.Changeset{valid?: true, changes: %{title: title, seo_settings: seo} = changes} =
           changeset
       ) do
    default_description =
      "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"

    cover_url =
      if changes[:cover_id] do
        cover = Repo.get(Media, changes[:cover_id])
        File.url({cover.file, cover})
      else
        nil
      end

    default = %{
      # base seo tags
      description: seo[:description] || default_description,
      keywords: seo[:keywords] || [],
      # twitter fields
      twitter_card: seo[:twitter_card] || "summary_large_image",
      twitter_description: seo[:twitter_description] || seo[:description] || default_description,
      twitter_title: seo[:twitter_title] || title,
      twitter_creator: seo[:twitter_creator] || "@BloomChainNews",
      twitter_site: seo[:twitter_site] || "@BloomChainNews",
      twitter_image: seo[:twitter_image] || cover_url,
      # open graph fields
      og_title: seo[:og_title] || title,
      og_description: seo[:og_description] || seo[:description] || default_description,
      og_image: seo[:og_image] || cover_url,
      og_type: seo[:og_type] || "article"
    }

    put_change(changeset, :seo_settings, default)
  end

  defp process_seo(changeset), do: changeset
end
