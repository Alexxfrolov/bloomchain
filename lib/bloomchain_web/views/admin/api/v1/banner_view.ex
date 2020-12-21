defmodule BloomchainWeb.Admin.Api.V1.BannerView do
  use BloomchainWeb, :view
  import BloomchainWeb.Admin.Api.V1.MediaView, only: [media_json: 1]

  def render("index.json", %{items: items, meta: meta}) do
    %{
      data: Enum.map(items, &banner_json/1),
      meta: meta
    }
  end

  def render("show.json", %{item: item}) do
    banner_json(item)
  end

  def banner_json(item) do
    %{
      id: item.id,
      type: item.type,
      status: item.status,
      target_url: item.target_url,
      client: item.client,
      date_start: item.date_start,
      date_end: item.date_end,
      desktop_cover: media_json(item.desktop_cover),
      mobile_cover: media_json(item.mobile_cover),
      inserted_at: item.inserted_at,
      updated_at: item.updated_at
    }
  end
end
