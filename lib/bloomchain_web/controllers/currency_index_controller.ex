defmodule BloomchainWeb.CurrencyIndexController do
  use BloomchainWeb, :controller

  def index(conn, %{"currency" => "bitcoin"}) do
    render(conn, "index.html")
  end

  def index(conn, %{"currency" => "all"}) do
    render(conn, "index.html")
  end
end
