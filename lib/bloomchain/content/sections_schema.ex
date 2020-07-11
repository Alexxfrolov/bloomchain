defmodule Bloomchain.Content.Section do
  use Ecto.Schema
  import Ecto.Changeset

  @required_fields ~w(slug name)a

  schema "sections" do
    field(:slug, :string)
    field(:name, :string)
    field(:seo_settings, :map)

    timestamps()
  end

  def changeset(changeset, attrs) do
    changeset
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:slug)
    |> unique_constraint(:name)
    |> process_seo()
  end

  defp process_seo(
         %Ecto.Changeset{valid?: true, changes: %{seo_settings: seo} = changes} = changeset
       ) do
    default_description =
      "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"

    settings = %{
      title: seo[:title] || changes[:name],
      description: seo[:description] || default_description
    }

    put_change(changeset, :seo_settings, settings)
  end

  defp process_seo(changeset), do: changeset
end
