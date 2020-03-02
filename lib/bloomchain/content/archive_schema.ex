defmodule Bloomchain.Content.Archive do
  use Ecto.Schema

  import Ecto.Changeset

  alias Bloomchain.Content.{Media}

  schema "archives" do
    belongs_to(:cover, Media, foreign_key: :cover_id)
    belongs_to(:pdf, Media, foreign_key: :pdf_id)

    timestamps()
  end

  @required_fields ~w(cover_id pdf_id)a

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def create_changeset(struct, params \\ %{}) do
    struct
    |> cast(prepared_params(params), @required_fields)
    |> validate_required(@required_fields)
  end

  defp prepared_params(%{"pdf" => pdf, "cover" => cover}) do
    %{cover_id: cover["id"], pdf_id: pdf["id"]}
  end

  defp prepared_params(%{"pdf" => pdf}), do: %{pdf_id: pdf["id"]}

  defp prepared_params(%{"cover" => cover}), do: %{cover_id: cover["id"]}

  defp prepared_params(params), do: params
end