defmodule Bloomchain.Content.Subscriber do
  import Ecto.Changeset

  use Ecto.Schema

  schema "subscribers" do
    field(:email, :string, unique: true)

    timestamps()
  end

  def changeset(subscriber, params \\ %{}) do
    subscriber
    |> cast(params, [:email])
    |> validate_required([:email])
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
  end
end
