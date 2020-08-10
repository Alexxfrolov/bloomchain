defmodule Bloomchain.Content.Banner do
  use Ecto.Schema
  import Ecto.{Changeset, Query}

  alias Bloomchain.Repo
  alias Bloomchain.Content.{Banner, Media, Event}

  schema "banners" do
    field(:type, :string)
    field(:target_url, :string)
    field(:status, :string, default: "waiting")
    field(:client, :string)

    field(:date_start, :utc_datetime)
    field(:date_end, :utc_datetime)

    belongs_to(:desktop_cover, Media, foreign_key: :desktop_cover_id)
    belongs_to(:mobile_cover, Media, foreign_key: :mobile_cover_id)

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
  end

  def rand(type) do
    ids =
      from(b in Banner, where: b.type == ^type and b.status == "active", select: b.id)
      |> Repo.all()

    if length(ids) > 0 do
      :rand.seed(:exrop, {101, 102, 103})
      id = Enum.random(ids)

      Repo.get!(Banner, id)
      |> Repo.preload([:desktop_cover, :mobile_cover])
    else
      nil
    end
  end

  def delete!(id) do
    Repo.transaction(fn ->
      item = Repo.get!(Banner, id)

      Repo.delete!(item)
      Media.delete!(item.desktop_cover_id)
      Media.delete!(item.mobile_cover_id)
    end)
  end
end
