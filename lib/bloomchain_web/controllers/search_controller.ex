defmodule BloomchainWeb.SearchController do
  use BloomchainWeb, :controller

  alias Bloomchain.ElasticsearchCluster, as: ES

  def index(conn, %{query: query}) do
    %{entries: articles, metadata: meta} = ES.search(query)

    render(conn, "index.html", articles: articles, meta: meta, query: query)
  end

  def index(conn, %{scroll: scroll}) do
    %{entries: articles, metadata: meta} = ES.scroll(scroll)

    conn
    |> put_resp_header("x-pagination-scroll", to_string(meta.after))
    |> put_layout(false)
    |> put_view(BloomchainWeb.SharedView)
    |> render("_article_block.html", articles: articles, meta: meta)
  end
end
