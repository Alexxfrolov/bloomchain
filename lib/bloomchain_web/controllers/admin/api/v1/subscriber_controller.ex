defmodule BloomchainWeb.Admin.Api.V1.SubscriberController do
  use BloomchainWeb, :controller

  import BloomchainWeb.Plug.ValidParams
  import Bloomchain.Paginator

  alias Bloomchain.{Repo, Content.Subscriber}

  plug :valid_filters, [:since, :until] when action in [:index]
  plug :valid_sort_params when action in [:index]

  def index(conn, params) do
    %{entries: subscribers, metadata: meta} =
      Subscriber
      |> Repo.q_filter_by(conn.assigns.filters)
      |> Repo.q_sort_by(conn.assigns.sort_params)
      |> paginate(params)

    render(conn, "index.json", subscribers: subscribers, meta: meta)
  end
end
