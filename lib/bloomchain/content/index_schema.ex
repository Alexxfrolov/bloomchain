defmodule Bloomchain.Content.Index do
  use Ecto.Schema

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

  def list(:all, type) do
    from(
      i in Index,
      where: i.type == ^type,
      order_by: [asc: i.time],
      select: %{time: i.time, value: i.value}
    )
    |> Repo.all()
  end

  def list(:day, type) do
    from(
      i in Index,
      where:
        i.type == ^type and i.time > ^(Timex.now() |> Timex.shift(days: -1) |> Timex.to_unix()),
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
