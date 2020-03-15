defmodule BloomchainWeb.Api.CurrencyIndexController do
  use BloomchainWeb, :controller

  alias Bloomchain.Content.Index

  def index(conn, %{currency: "bitcoin"}) do
    # url = "https://bloomchain.ru/?cryptocurrency_price_index&action=get_data"
    #
    # with {:ok, resp} <- HTTPoison.get(url),
    #      {:ok, data} <- Poison.decode(resp.body) do
    #   conn
    #   |> render("index.json", data: data)
    # else
    #   {:error, _} ->
    #     conn
    #     |> put_req_header("content-type", "application/json")
    #     |> put_status(503)
    # end
    conn
    |> render("index.json", data: Index.list_all("bitcoin"))
  end

  def index(conn, %{currency: "all"}) do
    # url = "https://bloomchain.ru/?bitcoin_price_index&action=get_data"
    #
    # with {:ok, resp} <- HTTPoison.get(url),
    #      {:ok, data} <- Poison.decode(resp.body) do
    #   conn
    #   |> render("index.json", data: data)
    # else
    #   {:error, _} ->
    #     conn
    #     |> put_req_header("content-type", "application/json")
    #     |> put_status(503)
    # end

    conn
    |> render("index.json", data: Index.list_all("top_10"))
  end
end
