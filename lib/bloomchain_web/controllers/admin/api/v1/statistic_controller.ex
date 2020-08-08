defmodule BloomchainWeb.Admin.Api.V1.StatisticController do
  use BloomchainWeb, :controller

  import BloomchainWeb.Plug.ValidParams

  alias Bloomchain.Repo
  alias Bloomchain.{Content.Banner, Content.Event}

  plug :valid_filters, [:banner_id, :since, :until] when action in [:index]
  plug :valid_assoc_filters, [:status] when action in [:index]

  def index(conn, params) do
    items =
      Event
      |> Repo.q_filter_by(conn.assigns.filters)
      |> Repo.q_filter_by(:banner, conn.assigns.assoc_filters)
      |> Event.group_stats()
      |> Repo.all()

    render(conn, "index.json",
      items: items |> Repo.preload(banner: [:desktop_cover, :mobile_cover]),
      meta: %{}
    )
  end
end
