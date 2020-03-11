defmodule Bloomchain.Repo.Migrations.AddAuthorsTable do
  use Ecto.Migration

  def change do
    create table(:authors) do
      add(:name, :string, null: true)
      add(:user_id, references(:users), null: true)

      timestamps()
    end

    create(unique_index(:authors, [:name]))
  end
end
