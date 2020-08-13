defmodule Bloomchain.Repo.Migrations.AddTotalViewsToBanners do
  use Ecto.Migration

  def change do
    alter table(:banners) do
      add(:total_views, :integer, default: 0)
    end
  end
end
