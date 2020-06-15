defmodule BloomchainWeb.Api.SubscriptionController do
  use BloomchainWeb, :controller

  alias Bloomchain.{Repo, Content.Subscriber}

  def create(conn, params) do
    Subscriber.changeset(%Subscriber{}, params) |> Repo.insert!()

    conn
    |> send_resp(201, "")
  end
end
