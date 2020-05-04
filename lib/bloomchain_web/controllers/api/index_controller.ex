defmodule BloomchainWeb.Api.IndexController do
  use BloomchainWeb, :controller

  alias Bloomchain.Content.Index

  def index(conn, %{type: type, period: "day"}) do
    conn
    |> render("index.json", data: Index.list(:day, type))
  end

  def index(conn, %{type: type, period: "all"}) do
    conn
    |> render("index.json", data: Index.list(:all, type))
  end
end
