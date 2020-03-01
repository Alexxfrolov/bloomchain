defmodule Bloomchain.Content.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field(:role, :string, default: "writer")
    field(:email, :string, unique: true)
    field(:name, :string)
    field(:job, :string)
    field(:phone, :string)
    field(:password_hash, :string)

    field(:password, :string, virtual: true)
    timestamps()
  end

  @required_fields ~w(name email)a
  @optional_fields ~w(role password phone job)a

  def create_changeset(user, params \\ %{}) do
    user
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
    |> validate_length(:name, min: 3)
    |> validate_length(:password, min: 6)
    |> put_password_hash()
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(pass))

      _ ->
        changeset
    end
  end
end
