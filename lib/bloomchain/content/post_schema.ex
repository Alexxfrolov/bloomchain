defmodule Bloomchain.Content.Post do
  import Ecto.Changeset
  require Slugger

  use Ecto.Schema
  use Arc.Ecto.Schema

  alias Bloomchain.Auth.User
  alias Bloomchain.Content.Tag
  alias BloomchainWeb.Uploaders.Cover

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

    field(:cover, Cover.Type)

    belongs_to(:user, User)
    many_to_many(:tags, Tag, join_through: "posts_tags")

    timestamps()
  end

  def create_changeset(post, attrs) do
    post
    |> common_changeset(attrs)
    |> validate_required([:user_id])
  end

  def common_changeset(changeset, attrs) do
    changeset
    |> cast(attrs, [:title, :body, :lead, :type, :status, :user_id])
    |> cast_attachments(attrs, [:cover])
    |> validate_required([:title, :body, :lead, :type, :user_id])
    |> validate_length(:title, min: 3)
    |> process_slug
  end

  # Private

  defp process_slug(%Ecto.Changeset{valid?: validity, changes: %{title: title}} = changeset) do
    case validity do
      true -> put_change(changeset, :slug, Slugger.slugify_downcase(title))
      false -> changeset
    end
  end

  defp process_slug(changeset), do: changeset
end
