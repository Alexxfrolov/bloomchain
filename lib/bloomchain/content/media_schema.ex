defmodule Bloomchain.Content.Media do
  use Ecto.Schema
  use Waffle.Ecto.Schema

  import Ecto.Changeset
  import Ecto.Query

  alias Bloomchain.Repo
  alias Bloomchain.Content.{Media}
  alias BloomchainWeb.Uploaders.File

  def fetch(term, key) do
    term
    |> Map.from_struct()
    |> Map.fetch(key)
  end

  schema "media" do
    field(:file, File.Type)
    field(:uuid, :string)
    field(:title, :string)
    field(:alt, :string, null: false)
    field(:source, :string)
    field(:content_type, :string, null: false)
    field(:type, :string, null: false)

    timestamps()
  end

  @required_fields ~w(type)a
  @optional_fields ~w(title source uuid content_type alt)a

  def list_all(type) do
    from(
      m in Media,
      where: m.type == ^type,
      order_by: [desc: m.inserted_at]
    )
    |> Repo.all()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> check_uuid
    |> cast_attachments(params, [:file])
    |> set_content_type(params)
    |> validate_required(@required_fields)
  end

  def delete!(id) do
    item = Repo.get!(Media, id)

    File.delete({item.file, item})
    Repo.delete!(item)
  end

  def srcset(cover) do
    [
      File.url({cover.file, cover}, :"380") <> " 600w",
      File.url({cover.file, cover}, :"540") <> " 1000w",
      File.url({cover.file, cover}, :"800") <> " 1600w"
    ]
    |> Enum.join(", ")
  end

  def srcset(cover, :webp) do
    [
      File.url({cover.file, cover}, :"380_webp") <> " 600w",
      File.url({cover.file, cover}, :"540_webp") <> " 1000w",
      File.url({cover.file, cover}, :"800_webp") <> " 1600w"
    ]
    |> Enum.join(", ")
  end

  def srcset(cover, :jp2) do
    [
      File.url({cover.file, cover}, :"380_jp2") <> " 600w",
      File.url({cover.file, cover}, :"540_jp2") <> " 1000w",
      File.url({cover.file, cover}, :"800_jp2") <> " 1600w"
    ]
    |> Enum.join(", ")
  end

  defp check_uuid(changeset) do
    case get_field(changeset, :uuid) do
      nil ->
        force_change(changeset, :uuid, UUID.uuid1())

      _ ->
        changeset
    end
  end

  defp set_content_type(changeset, %{file: %Plug.Upload{content_type: content_type}}) do
    changeset
    |> put_change(:content_type, content_type)
  end

  defp set_content_type(changeset, _params), do: changeset
end
