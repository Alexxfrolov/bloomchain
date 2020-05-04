defmodule Bloomchain.Repo.Migrations.AddCoinsTable do
  use Ecto.Migration

  def change do
    create table(:coins) do
      add(:name, :string, null: false)
      add(:symbol, :string, null: false)
      add(:slug, :string, null: false)
      add(:rank, :integer)

      timestamps()
    end

    create(unique_index(:coins, :slug))
    create(unique_index(:coins, :rank))
  end
end
