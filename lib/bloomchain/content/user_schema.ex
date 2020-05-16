defmodule Bloomchain.Content.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Bloomchain.Content.Author

  schema "users" do
    field(:role, :string, default: "writer")
    field(:email, :string, unique: true)
    field(:first_name, :string)
    field(:last_name, :string)
    field(:job, :string)
    field(:phone, :string)
    field(:password_hash, :string)

    field(:password, :string, virtual: true)
    timestamps()

    has_one(:author, Author, on_delete: :delete_all)
  end

  @required_fields ~w(first_name last_name email)a
  @optional_fields ~w(id role password phone job)a

  def changeset(user, params \\ %{}) do
    user
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
    |> validate_length(:password, min: 3)
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
