defmodule BloomchainWeb.Api.V1.ArticleController do
  use BloomchainWeb, :controller

  alias Bloomchain.Content.Article

  def index(conn, _params) do
    articles = Article.get_published_posts("detailed", limit: 3)

    render(conn, "index.json", articles: articles)
  end

  def create(conn, params) do
    require IEx
    IEx.pry()
  end
end
