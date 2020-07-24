defmodule Bloomchain.Repo.Migrations.CreateRedirects do
  use Ecto.Migration

  def change do
    create table(:redirects) do
      add(:path_from, :string, null: false)
      add(:path_to, :string, null: false)
      add(:section_id, references(:sections), null: true)

      timestamps()
    end

    create(unique_index(:redirects, [:path_from]))
  end
end
