defmodule Bloomchain.Repo.Migrations.AddReloadedToMedia do
  use Ecto.Migration

  def change do
    alter table(:media) do
      add(:reloaded, :boolean, default: false)
    end
  end
end
