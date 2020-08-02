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

    field(:total_views, :integer)
    field(:total_clicks, :integer)

    belongs_to(:cover_desktop, Media, foreign_key: :cover_desktop_id)
    belongs_to(:cover_mobile, Media, foreign_key: :cover_mobile_id)

    timestamps()
  end

  @required_fields ~w(type target_url date_start date_end)a
  @optional_fields ~w(client cover_desktop_id cover_mobile_id)a
  @types ~w(header article)a
  @statuses ~w(waiting active unactive)a

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> cast_assoc(:cover_desktop)
    |> cast_assoc(:cover_tablet)
    |> cast_assoc(:cover_mobile)
    |> validate_required(@required_fields)
    |> validate_inclusion(:type, @types)
    |> validate_inclusion(:status, @statuses)
  end
end
