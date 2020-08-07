defmodule BloomchainWeb.Admin.Api.V1.StatisticView do
  use BloomchainWeb, :view
  import BloomchainWeb.Admin.Api.V1.BannerView, only: [banner_json: 1]

  def render("index.json", %{items: items, meta: meta}) do
    %{
      data: Enum.map(items, &statistic_json/1),
      meta: meta
    }
  end

  def statistic_json(item) do
    %{
      banner: banner_json(item.banner),
      statistics: stats_json(item)
    }
  end

  defp stats_json(item) do
    %{
      total_views: item.total_views,
      total_clicks: item.total_clicks,
      ctr: Float.round(item.total_clicks / item.total_views, 2)
    }
  end
end
