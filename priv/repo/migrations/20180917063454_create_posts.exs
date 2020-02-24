defmodule Bloomchain.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add(:slug, :string, unique: true)
      add(:title, :string)
      add(:body, :text)
      add(:lead, :text)
      add(:type, :string)
      add(:keywords, {:array, :string})
      add(:description, :string, size: 512)
      # add(:user_id, references(:users))
      add(:status, :string, size: 100, default: "draft", null: false)
      add(:author, :string)
      add(:cover, :string)
      add(:time, :integer)
      timestamps()
      add(:published_at, :timestamp, null: true)
    end

    create(unique_index(:posts, [:slug]))
  end
end
