defmodule Bloomchain.Repo.Migrations.AddPostsAuthorsTable do
  use Ecto.Migration

  def change do
    create table(:posts_authors) do
      add(:post_id, references(:posts), null: false)
      add(:author_id, references(:authors), null: false)
    end

    create(unique_index(:posts_authors, [:post_id, :author_id]))
  end
end
