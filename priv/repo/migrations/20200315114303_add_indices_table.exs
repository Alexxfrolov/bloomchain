defmodule Bloomchain.Repo.Migrations.AddIndicesTable do
  use Ecto.Migration

  def change do
    create table(:indices) do
      add(:value, :float, null: false)
      add(:time, :integer, null: false)
      add(:type, :string, null: false)

      timestamps()
    end

    create(unique_index(:indices, [:time, :type], name: :uniq_time_with_type))
  end
end
