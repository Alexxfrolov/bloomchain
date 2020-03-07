defmodule Bloomchain.Content.Author do
  import Ecto.Changeset

  alias Bloomchain.Content.Post

  use Ecto.Schema

  schema "authors" do
    field(:name, :string, unique: true)

    many_to_many(:posts, Post, join_through: "posts_authors")

    timestamps()
  end

  def create_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end
end
