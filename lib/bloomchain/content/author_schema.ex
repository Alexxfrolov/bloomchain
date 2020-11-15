defmodule Bloomchain.Content.Author do
  use BloomchainWeb, :model

  import Ecto.Changeset

  alias Bloomchain.Content.{Post, User, PostAuthor}

  schema "authors" do
    field(:name, :string, unique: true)

    belongs_to(:user, User)

    many_to_many(:posts, Post, join_through: "posts_authors")
    has_many(:post_ids, PostAuthor)

    timestamps()
  end

  @required_fields ~w(name)a
  @optional_fields ~w(id user_id)a

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:name)
  end
end
