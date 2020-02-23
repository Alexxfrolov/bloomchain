defmodule BloomchainWeb.Admin.Api.V1.UserController do
  use BloomchainWeb, :controller

  alias Bloomchain.Content.Article

  def index(conn, _params) do
    articles = Article.get_published_posts("detailed", limit: 3)

    render(conn, "index.json", articles: articles)
  end
end
