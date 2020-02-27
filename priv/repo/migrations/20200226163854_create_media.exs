defmodule Bloomchain.Repo.Migrations.CreateMedia do
  use Ecto.Migration

  def change do
    create table(:media) do
      add(:file, :string, null: false)
      add(:uuid, :string, null: false)
      add(:title, :string)
      add(:alt, :string)
      add(:source, :string)
      add(:content_type, :string, null: false)
      add(:type, :string, null: false)

      timestamps()
    end

    create(unique_index(:media, [:uuid]))
  end
end
