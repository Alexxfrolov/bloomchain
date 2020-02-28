defmodule Bloomchain.Content.Media do
  use Ecto.Schema
  use Arc.Ecto.Schema

  import Ecto.Changeset
  import Ecto.Query
  alias Bloomchain.Repo
  alias Bloomchain.Content.{Media}
  alias BloomchainWeb.Uploaders.File

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
    Repo.all(
      from(
        m in Media,
        where: m.type == ^type
      )
    )
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def create_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields ++ @optional_fields)
    |> check_uuid
    |> cast_attachments(params, [:file])
    |> set_content_type(params)
    |> validate_required(@required_fields)
  end

  defp check_uuid(changeset) do
    case get_field(changeset, :uuid) do
      nil ->
        force_change(changeset, :uuid, UUID.uuid1())

      _ ->
        changeset
    end
  end

  defp set_content_type(changeset, %{"file" => %Plug.Upload{content_type: content_type}}) do
    changeset
    |> put_change(:content_type, content_type)
  end

  defp set_content_type(changeset, %{file: %Plug.Upload{content_type: content_type}}) do
    changeset
    |> put_change(:content_type, content_type)
  end

  defp set_content_type(changeset, _params), do: changeset
end
