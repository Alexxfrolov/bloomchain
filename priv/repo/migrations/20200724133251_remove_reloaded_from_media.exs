defmodule Bloomchain.Repo.Migrations.RemoveReloadedFromMedia do
  use Ecto.Migration

  def change do
    alter table(:media) do
      remove(:reloaded, :boolean, default: false)
    end
  end
end
