defmodule BloomchainWeb.SearchController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article
  alias Bloomchain.ElasticsearchCluster, as: ES

  def index(conn, %{query: query}) do
    articles = ES.search(query)

    render(conn, "index.html", articles: articles, meta: nil)
  end
end
