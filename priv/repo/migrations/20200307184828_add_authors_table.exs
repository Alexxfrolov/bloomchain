defmodule Bloomchain.Repo.Migrations.AddAuthorsTable do
  use Ecto.Migration

  def change do
    create table(:authors) do
      add(:name, :string, null: false)

      timestamps()
    end

    create(unique_index(:authors, [:name]))
  end
end
