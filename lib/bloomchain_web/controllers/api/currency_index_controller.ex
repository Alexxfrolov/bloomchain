defmodule BloomchainWeb.Api.CurrencyIndexController do
  use BloomchainWeb, :controller

  alias Bloomchain.Content.Index

  def index(conn, %{currency: "bitcoin"}) do
    conn
    |> render("index.json", data: Index.list_all("bitcoin"))
  end

  def index(conn, %{currency: "all"}) do
    conn
    |> render("index.json", data: Index.list_all("top_10"))
  end
end
