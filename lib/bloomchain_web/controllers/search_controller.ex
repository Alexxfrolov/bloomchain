defmodule BloomchainWeb.SearchController do
  use BloomchainWeb, :controller

  alias Bloomchain.ElasticsearchCluster, as: ES

  def index(conn, %{"query" => query}) do
    articles = ES.search(query)

    render(conn, "index.html", articles: articles, meta: %{}, query: query)
  end
end
