defmodule BloomchainWeb.Api.IndexController do
  use BloomchainWeb, :controller

  alias Bloomchain.Content.Index

  def index(conn, %{type: type}) do
    conn
    |> render("index.json", data: Index.list(type))
  end
end
