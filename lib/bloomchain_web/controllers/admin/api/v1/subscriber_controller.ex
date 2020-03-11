defmodule BloomchainWeb.Admin.Api.V1.SubscriberController do
  use BloomchainWeb, :controller

  require Ecto.Query

  alias Bloomchain.Repo
  alias Bloomchain.Content.Subscriber

  def index(conn, _params) do
    subscribers =
      Subscriber
      |> Ecto.Query.order_by(desc: :inserted_at)
      |> Repo.all()

    render(conn, "index.json", subscribers: subscribers)
  end
end
