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
      add(:user_id, references(:users, on_delete: :delete_all))
      add(:status, :string, size: 100, default: "draft", null: false)
      add(:cover, :string)

      timestamps()
    end
  end
end
