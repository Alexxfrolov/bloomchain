defmodule Bloomchain.Repo.Migrations.CreateBanners do
  use Ecto.Migration

  def change do
    create table(:banners) do
      add(:type, :string, null: false)
      add(:target_url, :string, null: false)
      add(:status, :string, null: false)
      add(:client, :string)

      add(:date_start, :utc_datetime, null: false)
      add(:date_end, :utc_datetime, null: false)

      add(:desktop_cover_id, references(:media))
      add(:mobile_cover_id, references(:media))

      timestamps()
    end
  end
end
