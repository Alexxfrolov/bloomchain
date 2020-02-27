defmodule Bloomchain.Repo.Migrations.CreateMedia do
  use Ecto.Migration

  def change do
    create table(:media) do
      add(:file, :string, null: false)
      add(:title, :string)
      add(:alt, :string, null: false)
      add(:source, :string)
      add(:mime_type, :string, null: false)
      add(:type, :string, null: false)

      timestamps()
    end

    create(unique_index(:media, [:file]))
  end
end
