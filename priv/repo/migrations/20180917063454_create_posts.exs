defmodule Bloomchain.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add(:slug, :string)
      add(:title, :string, null: false)
      add(:body, :text)
      add(:lead, :text)
      add(:type, :string, size: 50, null: false)
      add(:status, :string, size: 50, default: "draft", null: false)
      add(:author, :string)
      add(:cover_id, references(:media))
      add(:time, :integer)
      add(:total_views, :integer, default: 0)
      add(:published_at, :timestamp, null: true)
      add(:seo_settings, :map)

      timestamps()
    end

    create(unique_index(:posts, [:slug, :type], name: :uniq_slug_with_type))
  end
end
