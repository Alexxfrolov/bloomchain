defmodule Bloomchain.Repo.Migrations.CreateSections do
  use Ecto.Migration

  def change do
    create table(:sections) do
      add(:type, :string, null: false)
      add(:name, :string, null: false)
      add(:seo_settings, :map)

      timestamps()
    end

    create(unique_index(:sections, [:type]))
    create(unique_index(:sections, [:name]))
  end
end
