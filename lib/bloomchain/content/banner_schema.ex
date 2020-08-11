defmodule Bloomchain.Content.Banner do
  use Ecto.Schema
  import Ecto.{Changeset, Query}

  alias Bloomchain.Repo
  alias Bloomchain.Content.{Banner, Media, Event}

  def fetch(term, key) do
    term
    |> Map.from_struct()
    |> Map.fetch(key)
  end

  schema "banners" do
    field(:type, :string)
    field(:target_url, :string)
    field(:status, :string, default: "waiting")
    field(:client, :string)

    field(:date_start, :utc_datetime)
    field(:date_end, :utc_datetime)

    belongs_to(:desktop_cover, Media, foreign_key: :desktop_cover_id)
    belongs_to(:mobile_cover, Media, foreign_key: :mobile_cover_id)

    field(:total_views, :integer)

    has_many(:events, Event, on_delete: :delete_all)

    timestamps()
  end

  @required_fields ~w(type target_url date_start date_end)a
  @optional_fields ~w(client status desktop_cover_id mobile_cover_id)a
  @types ~w(header article)
  @statuses ~w(waiting active unactive)

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> cast_assoc(:desktop_cover)
    |> cast_assoc(:mobile_cover)
    |> validate_required(@required_fields)
    |> validate_inclusion(:type, @types)
    |> validate_inclusion(:status, @statuses)
    |> process_total_views()
  end

  def next(type) do
    from(b in Banner,
      where: b.type == ^type and b.status == "active",
      preload: [:desktop_cover, :mobile_cover],
      order_by: [asc: :total_views],
      limit: 1
    )
    |> Repo.one()
  end

  def delete!(id) do
    Repo.transaction(fn ->
      item = Repo.get!(Banner, id)

      Repo.delete!(item)
      Media.delete!(item.desktop_cover_id)
      Media.delete!(item.mobile_cover_id)
    end)
  end

  def inc_total_views(%{id: id}) do
    from(p in Banner, where: p.id == ^id, select: [:total_views])
    |> Repo.update_all(inc: [total_views: 1])
  end

  defp process_total_views(
         %Ecto.Changeset{valid?: true, changes: changes, data: data} = changeset
       ) do
    status = changes[:status] || data[:status]
    type = changes[:type] || data[:type]

    if (changes[:type] && status == "active") || changes[:status] == "active" do
      from(b in Banner,
        where: (b.status == "active" and b.type == ^type) or b.id == ^data[:id]
      )
      |> Repo.update_all(set: [total_views: 0])
    end

    changeset
  end

  defp process_total_views(changeset), do: changeset
end
