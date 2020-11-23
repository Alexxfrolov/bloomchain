defmodule Bloomchain.Content.Index do
  use BloomchainWeb, :model

  import Ecto.Changeset
  import Ecto.Query

  alias Bloomchain.Repo
  alias Bloomchain.Content.Index

  schema "indices" do
    field(:value, :float)
    field(:type, :string)
    field(:time, :integer)

    timestamps()
  end

  def list(type) do
    from(
      i in Index,
      where: i.type == ^type,
      order_by: [asc: i.time],
      select: %{time: i.time, value: i.value}
    )
    |> Repo.all()
  end

  def last(type) do
    from(
      i in Index,
      where: i.type == ^type,
      order_by: [desc: i.time],
      select: %{value: i.value},
      limit: 1
    )
    |> Repo.one()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:value, :type, :time])
    |> unique_constraint(:uniq_time_with_type)
  end
end
