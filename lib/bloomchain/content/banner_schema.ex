defmodule Bloomchain.Content.Banner do
  use Ecto.Schema
  import Ecto.{Changeset, Query}

  alias Bloomchain.Repo
  alias Bloomchain.Content.{Archive, Media}

  schema "banners" do
    field(:type, :string)
    field(:url, :string)
    field(:client, :string)

    belongs_to(:cover_desktop, Media, foreign_key: :cover_desktop_id)
    belongs_to(:cover_tablet, Media, foreign_key: :cover_tablet_id)
    belongs_to(:cover_mobile, Media, foreign_key: :cover_mobile_id)

    timestamps()
  end

  @required_fields ~w(type url)a
  @optional_fields ~w(client)a

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(@required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end
end
