defmodule Bloomchain.Content.Tag do
  import Ecto.Changeset

  alias Bloomchain.Content.Post

  use Ecto.Schema

  def fetch(term, key) do
    term
    |> Map.from_struct()
    |> Map.fetch(key)
  end

  schema "tags" do
    field(:name, :string)
    field(:slug, :string, unique: true)

    many_to_many(:posts, Post, join_through: "posts_tags")

    timestamps()
  end

  def changeset(tag, params \\ %{}) do
    tag
    |> cast(params, [:name])
    |> validate_required([:name])
    |> process_slug
    |> unique_constraint(:slug)
  end

  defp process_slug(%Ecto.Changeset{valid?: validity, changes: %{name: name}} = changeset) do
    case validity do
      true -> put_change(changeset, :slug, Slugger.slugify_downcase(name))
      false -> changeset
    end
  end

  defp process_slug(changeset), do: changeset
end
