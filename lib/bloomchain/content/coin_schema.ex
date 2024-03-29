defmodule Bloomchain.Content.Coin do
  use BloomchainWeb, :model

  import Ecto.Changeset
  import Ecto.Query

  alias Bloomchain.Repo
  alias Bloomchain.Content.Coin

  schema "coins" do
    field(:name, :string)
    field(:symbol, :string)
    field(:slug, :string)
    field(:rank, :integer)

    timestamps()
  end

  @required_fields ~w(name symbol slug)a
  @optional_fields ~w(id rank)a

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:slug)
    |> clear_rank()
  end

  def top_10 do
    from(
      c in Coin,
      select: %{id: c.id},
      where: c.rank >= 1,
      where: c.rank <= 10
    )
    |> Repo.all()
  end

  def all_ids do
    from(
      i in Coin,
      select: %{id: i.id}
    )
    |> Repo.all()
    |> Enum.map(& &1.id)
  end

  defp clear_rank(%{changes: %{rank: nil}} = struct) do
    struct
  end

  defp clear_rank(%{changes: %{rank: rank}} = struct) do
    if coin = Repo.get_by(Coin, rank: rank) do
      coin |> Coin.changeset(%{rank: nil}) |> Repo.update!()
    end

    struct
  end

  defp clear_rank(struct), do: struct
end
