defmodule Bloomchain.Content.Event do
  use BloomchainWeb, :model
  import Ecto.{Changeset, Query}

  alias Bloomchain.Content.{Banner, Event}

  schema "events" do
    field(:type, :string)
    field(:ip, :string)
    field(:user_agent, :string)

    # calculated fields
    field(:total_clicks, :integer, virtual: true)
    field(:total_views, :integer, virtual: true)

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

  def group_stats(query) do
    query
    |> group_by([e], e.banner_id)
    |> select([e], %Event{
      total_views: fragment("count(case ? when 'view' then 1 else null end)", e.type),
      total_clicks: fragment("count(case ? when 'click' then 1 else null end)", e.type),
      banner_id: e.banner_id
    })
  end
end
