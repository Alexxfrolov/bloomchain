defmodule Bloomchain.Content.Index do
  use Ecto.Schema

  import Ecto.Changeset
  import Ecto.Query

  alias Bloomchain.Repo
  alias Bloomchain.Content.Index

  @types ["bitcoin", "top_10"]

  schema "indices" do
    field(:value, :float)
    field(:type, :string)
    field(:time, :integer)

    timestamps()
  end

  def list_all(type) do
    from(
      i in Index,
      where: i.type == ^type,
      order_by: [asc: i.time],
      select: %{time: i.time, value: i.value}
    )
    |> Repo.all()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:value, :type, :time])
    |> unique_constraint(:uniq_time_with_type)
  end
end
