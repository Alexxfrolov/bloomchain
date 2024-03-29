defmodule Bloomchain.Repo.Migrations.CreatePostsTags do
  use Ecto.Migration

  def change do
    create table(:posts_tags) do
      add(:post_id, references(:posts), null: false)
      add(:tag_id, references(:tags), null: false)
    end

    create(unique_index(:posts_tags, [:post_id, :tag_id]))
  end
end
