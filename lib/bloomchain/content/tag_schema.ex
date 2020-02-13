defmodule Bloomchain.Content.Tag do
  import Ecto.Changeset

  alias Bloomchain.Content.Post

  use Ecto.Schema

  schema "tags" do
    field(:name, :string)
    many_to_many(:posts, Post, join_through: "posts_tags")

    timestamps()
  end
end
