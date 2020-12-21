defmodule BloomchainWeb.Admin.Api.V1.RedirectView do
  use BloomchainWeb, :view

  def render("index.json", %{items: items, meta: meta}) do
    %{
      data: Enum.map(items, &render("show.json", %{item: &1})),
      meta: meta
    }
  end

  def render("show.json", %{item: item}) do
    %{
      id: item.id,
      path_from: item.path_from,
      path_to: item.path_to,
      inserted_at: item.inserted_at,
      updated_at: item.updated_at
    }
  end
end
