defmodule Bloomchain.Content.Section do
  use BloomchainWeb, :model
  import Ecto.{Changeset, Query}

  alias Bloomchain.{Repo, Content.Section}

  @required_fields ~w(slug name seo_settings)a

  schema "sections" do
    field(:slug, :string)
    field(:name, :string)
    field(:seo_settings, :map)

    timestamps()
  end

  def map do
    from(
      s in Section,
      select: %{type: s.slug, name: s.name, seo: s.seo_settings}
    )
    |> Repo.all()
    |> Enum.reduce(%{}, fn item, new_item ->
      Map.merge(new_item, %{item.type => item})
    end)
  end

  def changeset(changeset, attrs) do
    changeset
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:slug)
    |> unique_constraint(:name)
  end
end
