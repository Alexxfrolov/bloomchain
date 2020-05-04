defmodule Bloomchain.Content.CoinPrice do
  use Ecto.Schema

  import Ecto.{Query, Changeset}

  alias Bloomchain.Repo
  alias Bloomchain.Content.{Coin, CoinPrice}

  schema "coin_prices" do
    field(:currency, :string, null: false)
    field(:price, :float, null: false)
    field(:volume_24h, :float, null: false)
    field(:market_cap, :float, null: false)
    field(:percent_change_1h, :float, null: false)
    field(:percent_change_24h, :float, null: false)
    field(:percent_change_7d, :float, null: false)
    field(:rank, :integer, null: false)

    belongs_to(:coin, Coin)

    timestamps()
  end

  @required_fields ~w(coin_id currency price volume_24h market_cap rank)a
  @optional_fields ~w(updated_at percent_change_1h percent_change_24h percent_change_7d)a

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end

  def current(%{id: coin_id}) do
    from(
      p in CoinPrice,
      where:
        p.coin_id == ^coin_id and
          p.inserted_at > ^Timex.shift(Timex.now(), minutes: -20),
      order_by: [desc: :id],
      limit: 1
    )
    |> Repo.one()
  end

  def previous(%{id: coin_id}) do
    [_ | tail] =
      from(
        p in CoinPrice,
        where:
          p.coin_id == ^coin_id and
            p.inserted_at > ^Timex.shift(Timex.now(), minutes: -20),
        order_by: [desc: :id],
        limit: 2
      )
      |> Repo.all()

    List.first(tail)
  end
end
