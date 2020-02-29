defmodule Bloomchain.Repo.Migrations.CreateArchives do
  use Ecto.Migration

  def change do
    create table(:archives) do
      add(:cover_id, references(:media))
      add(:pdf_id, references(:media))

      timestamps()
    end
  end
end
