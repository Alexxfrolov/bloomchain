defmodule Bloomchain.Repo.Migrations.CreateEvents do
  use Ecto.Migration

  def change do
    create table(:events) do
      add(:type, :string, null: false)
      add(:ip, :string)
      add(:user_agent, :string)

      add(:banner_id, references(:banners))

      timestamps()
    end
  end
end
