defmodule Bloomchain.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add(:name, :string)
      add(:password_hash, :string)
      add(:email, :string, unique: true)
      add(:role, :string, default: "writer", null: false)

      timestamps()
    end
  end
end
