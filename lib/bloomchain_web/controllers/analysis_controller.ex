defmodule BloomchainWeb.AnalysisController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def show(conn, params) do
    render(conn, "show.html", article: Article.get(params["id"], type: "analysis"))
  end
end
