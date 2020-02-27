defmodule Bloomchain.Content.Media do
  use Ecto.Schema
  use Arc.Ecto.Schema

  import Ecto.Changeset

  alias BloomchainWeb.Uploaders.File

  schema "media" do
    field(:file, File.Type)

    field(:title, :string)
    field(:alt, :string, null: false)
    field(:source, :string)
    field(:mime_type, :string, null: false)
    field(:type, :string, null: false)

    timestamps()
  end

  @required_fields ~w(alt mime_type type)a
  @optional_fields ~w(title source)a

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def create_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> cast_attachments(params, [:file])
    |> validate_required(@required_fields)
  end
end
