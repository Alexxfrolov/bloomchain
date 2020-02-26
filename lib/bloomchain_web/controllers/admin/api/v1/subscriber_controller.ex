defmodule BloomchainWeb.Admin.Api.V1.SubscriberController do
  use BloomchainWeb, :controller

  alias Bloomchain.Repo
  alias Bloomchain.Content.Subscriber

  def index(conn, _params) do
    subscribers = Repo.all(Subscriber)

    render(conn, "index.json", subscribers: subscribers)
  end
end
