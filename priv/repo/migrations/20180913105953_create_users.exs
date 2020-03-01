defmodule Bloomchain.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add(:name, :string, null: false)
      add(:password_hash, :string)
      add(:email, :string, null: false)
      add(:phone, :string, limit: 20)
      add(:job, :string)
      add(:role, :string, default: "writer", null: false)

      timestamps()
    end

    create(unique_index(:users, [:email]))
  end
end
