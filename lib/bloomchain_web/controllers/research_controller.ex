defmodule BloomchainWeb.ResearchController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article

  def index(conn, _params) do
    articles = Article.get_published_posts("research", limit: 6)

    render(conn, "index.html", articles: articles)
  end

  def show(conn, params) do
    render(conn, "show.html", article: Article.get(params["id"], type: "research"))
  end
end
