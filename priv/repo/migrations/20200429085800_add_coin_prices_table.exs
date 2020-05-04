defmodule Bloomchain.Repo.Migrations.AddCoinPricesTable do
  use Ecto.Migration

  def change do
    create table(:coin_prices) do
      add(:coin_id, references(:coins), null: false)
      add(:currency, :string, null: false)
      add(:price, :float, null: false)
      add(:volume_24h, :float, null: false)
      add(:market_cap, :float, null: false)
      add(:percent_change_1h, :float)
      add(:percent_change_24h, :float)
      add(:percent_change_7d, :float)
      add(:rank, :integer, null: false)

      timestamps()
    end
  end
end
