defmodule BloomchainWeb.Api.V1.TagController do
  use BloomchainWeb, :controller

  alias Bloomchain.Content.Article

  def index(conn, _params) do
    articles = Article.get_published_posts("detailed", limit: 20)

    render(conn, "index.json", articles: articles)
  end
end
