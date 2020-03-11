defmodule Bloomchain.Content.Post do
  import Ecto.Changeset
  import Ecto.Query

  require Slugger

  use Ecto.Schema
  use Arc.Ecto.Schema

  alias Bloomchain.Content.{Tag, Media, Author}
  alias Bloomchain.Repo

  @derive {Phoenix.Param, key: :slug}

  schema "posts" do
    field(:slug, :string, unique: true)
    field(:title, :string)
    field(:body, :string)
    field(:lead, :string)
    field(:type, :string)
    field(:keywords, {:array, :string})
    field(:description, :string)
    field(:status, :string)
    field(:time, :integer)
    field(:total_views, :integer)

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
  @optional_fields ~w( body lead type status time description keywords cover_id published_at)a

  def create_changeset(post, attrs) do
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
    |> process_tags(attrs[:tags] || attrs["tags"])
    |> process_authors(attrs[:authors] || attrs["authors"])
    |> process_published
  end

  # Private

  defp process_slug(%Ecto.Changeset{valid?: validity, changes: %{title: title}} = changeset) do
    case validity do
      true -> put_change(changeset, :slug, Slugger.slugify_downcase(title))
      false -> changeset
    end
  end

  defp process_slug(changeset), do: changeset

  defp process_published(
         %Ecto.Changeset{valid?: true, changes: %{status: "published", published_at: nil}} =
           changeset
       ) do
    put_change(
      changeset,
      :published_at,
      NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
    )
  end

  defp process_published(
         %Ecto.Changeset{valid?: true, changes: %{status: "published"}} = changeset
       ) do
    changeset
  end

  defp process_published(%Ecto.Changeset{valid?: true, changes: %{status: _}} = changeset) do
    put_change(changeset, :published_at, nil)
  end

  defp process_published(changeset), do: changeset

  defp process_tags(%Ecto.Changeset{valid?: true} = changeset, [%Tag{} | _] = tags) do
    changeset
    |> put_assoc(:tags, Enum.map(tags, tags))
  end

  defp process_tags(%Ecto.Changeset{valid?: true} = changeset, [%{"id" => _} | _] = tags) do
    changeset
    |> put_assoc(:tags, Enum.map(tags, &%Tag{id: &1["id"]}))
  end

  defp process_tags(%Ecto.Changeset{valid?: true} = changeset, tags) do
    tags = Repo.all(from(t in Tag, where: t.id in ^tags))

    changeset |> put_assoc(:tags, tags)
  end

  defp process_authors(%Ecto.Changeset{valid?: true} = changeset, [%Author{} | _] = authors) do
    changeset
    |> put_assoc(:authors, Enum.map(authors, authors))
  end

  defp process_authors(%Ecto.Changeset{valid?: true} = changeset, [%{"id" => _} | _] = authors) do
    changeset
    |> put_assoc(:authors, Enum.map(authors, &%Author{id: &1["id"]}))
  end

  defp process_authors(%Ecto.Changeset{valid?: true} = changeset, authors) do
    authors = Repo.all(from(t in Author, where: t.id in ^authors))

    changeset |> put_assoc(:authors, authors)
  end
end
