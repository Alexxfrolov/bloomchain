defmodule BloomchainWeb.Admin.Api.V1.SectionView do
  use BloomchainWeb, :view

  def render("index.json", %{items: items, meta: meta}) do
    %{
      data: Enum.map(items, &render("show.json", %{item: &1})),
      meta: meta
    }
  end

  def render("show.json", %{item: item}) do
    section_json(item)
  end

  def section_json(item) do
    %{
      id: item.id,
      name: item.name,
      slug: item.slug,
      inserted_at: item.inserted_at |> Timex.local(),
      updated_at: item.updated_at |> Timex.local(),
      seo_settings: item.seo_settings
    }
  end
end
