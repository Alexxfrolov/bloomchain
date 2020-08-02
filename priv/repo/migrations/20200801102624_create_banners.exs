defmodule Bloomchain.Repo.Migrations.CreateBanners do
  use Ecto.Migration

  def change do
    create table(:banners) do
      add(:type, :string, null: false)
      add(:url, :string, null: false)
      add(:client, :string)

      add(:desktop_cover_id, references(:media))
      add(:tablet_cover_id, references(:media))
      add(:mobile_cover_id, references(:media))

      timestamps()
    end
  end
end
