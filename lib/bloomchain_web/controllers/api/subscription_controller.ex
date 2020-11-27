defmodule BloomchainWeb.Api.SubscriptionController do
  use BloomchainWeb, :controller

  alias Bloomchain.{Repo, Content.Subscriber}

  def create(conn, params) do
    with {:ok, _} <- Subscriber.changeset(%Subscriber{}, params) |> Repo.insert() do
      conn
      |> send_resp(201, "")
    else
      {:error, _} ->
        conn
        |> send_resp(400, "")
    end
  end
end
