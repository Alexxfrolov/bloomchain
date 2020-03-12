defmodule Bloomchain.Content.Author do
  use Ecto.Schema

  import Ecto.Changeset

  alias Bloomchain.Content.{Post, User}

  schema "authors" do
    field(:name, :string, unique: true)

    belongs_to(:user, User)

    many_to_many(:posts, Post, join_through: "posts_authors")

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :user_id])
    |> unique_constraint(:name)
  end
end
