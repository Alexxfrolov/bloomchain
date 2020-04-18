defmodule BloomchainWeb.Admin.Api.V1.SubscriberController do
  use BloomchainWeb, :controller
  import Bloomchain.Plug.ValidParams

  alias Bloomchain.Repo
  alias Bloomchain.Content.Subscriber

  plug :valid_filters, [:since, :until] when action in [:index]
  plug :valid_sort_params when action in [:index]

  def index(conn, _params) do
    subscribers =
      Subscriber
      |> Repo.q_filter_by(conn.assigns.filters)
      |> Repo.q_sort_by(conn.assigns.sort_params)
      |> Repo.all()

    render(conn, "index.json", subscribers: subscribers)
  end
end
