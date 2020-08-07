defmodule Bloomchain.Content.Event do
  use Ecto.Schema
  import Ecto.Changeset

  alias Bloomchain.Content.Banner

  schema "events" do
    field(:type, :string)
    field(:ip, :string)
    field(:user_agent, :string)

    belongs_to(:banner, Banner, foreign_key: :banner_id)

    timestamps()
  end

  @required_fields ~w(banner_id type)a
  @optional_fields ~w(ip user_agent)a
  @types ~w(view click)

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_inclusion(:type, @types)
  end
end
