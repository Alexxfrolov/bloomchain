defmodule Bloomchain.Repo.Migrations.SetDefaultTimestamps do
  use Ecto.Migration

  def change do
    ~w(users media posts tags subscribers archives authors indices coins coin_prices)
    |> Enum.each(fn item ->
      alter table(item) do
        modify(:inserted_at, :timestamp, default: fragment("NOW()"))
        modify(:updated_at, :timestamp, default: fragment("NOW()"))
      end
    end)
  end
end
