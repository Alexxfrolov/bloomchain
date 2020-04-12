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

  @required_fields ~w(name)a
  @optional_fields ~w(user_id)a

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:name)
  end
end
