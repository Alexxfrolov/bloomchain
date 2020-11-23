defmodule Bloomchain.Repo.Migrations.UpdateTimestampsType do
  use Ecto.Migration

  @tables ~w(indices media archives authors banners coins
             subscribers users coin_prices events posts
             tags sections redirects)a

  def up do
    execute("SET TIME ZONE 'UTC';")

    for table_name <- @tables do
      alter table(table_name) do
        modify(:inserted_at, :timestamptz)
        modify(:updated_at, :timestamptz)
      end
    end

    alter table(:posts) do
      modify(:published_at, :timestamptz)
    end
  end

  def down do
    for table_name <- @tables do
      alter table(table_name) do
        modify(:inserted_at, :timestamp)
        modify(:updated_at, :timestamp)
      end
    end

    alter table(:posts) do
      modify(:published_at, :timestamp)
    end
  end
end
