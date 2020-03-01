defmodule BloomchainWeb.InRussiaController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article

  def index(conn, _params) do
    articles = Article.get_published_posts("in_russia", limit: 6)

    render(conn, "index.html", articles: articles)
  end

  def show(conn, params) do
    render(conn, "show.html", article: Article.get(params["id"], type: "in_russia"))
  end
end
