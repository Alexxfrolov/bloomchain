defmodule BloomchainWeb.PageController do
  use BloomchainWeb, :controller

  # alias Bloomchain.Content.Article

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
