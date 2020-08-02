defmodule Bloomchain.Content.Banner do
  use Ecto.Schema
  import Ecto.Changeset

  alias Bloomchain.Content.Media

  schema "banners" do
    field(:type, :string)
    field(:target_url, :string)
    field(:status, :string)
    field(:client, :string)

    field(:date_start, :utc_datetime)
    field(:date_end, :utc_datetime)

    belongs_to(:desktop_cover, Media, foreign_key: :desktop_cover_id)
    belongs_to(:mobile_cover, Media, foreign_key: :mobile_cover_id)

    timestamps()
  end

  @required_fields ~w(type target_url date_start date_end)a
  @optional_fields ~w(client status desktop_cover_id mobile_cover_id)a
  @types ~w(header article)
  @statuses ~w(waiting active unactive)

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> cast_assoc(:desktop_cover)
    |> cast_assoc(:mobile_cover)
    |> validate_required(@required_fields)
    |> validate_inclusion(:type, @types)
    |> validate_inclusion(:status, @statuses)
  end
end
