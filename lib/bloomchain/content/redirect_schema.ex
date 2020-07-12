defmodule Bloomchain.Content.Redirect do
  use Ecto.Schema
  import Ecto.Changeset

  alias Bloomchain.Repo
  alias Bloomchain.Content.{Section, Post, Redirect}

  schema "redirects" do
    field(:path_from, :string)
    field(:path_to, :string)

    belongs_to(:section, Section)

    timestamps()
  end

  @required_fields ~w(path_from path_to)a
  @optional_fields ~w(section_id)a

  def changeset(%Post{type: old_type} = post, %{type: new_type}) do
    # when post type is changed we create redirect to keep old urls active

    params = %{
      path_from: "/#{old_type}/#{post.slug}",
      path_to: "/#{new_type}/#{post.slug}",
      section_id: Repo.get_by!(Section, slug: old_type).id
    }

    changeset(%Redirect{}, params)
  end

  def changeset(%Redirect{} = struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:path_from)
  end
end
