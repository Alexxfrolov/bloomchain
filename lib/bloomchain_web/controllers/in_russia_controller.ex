defmodule BloomchainWeb.InRussiaController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article

  def index(conn, %{"scroll" => scroll}) do
    %{entries: articles, metadata: meta} = Article.paginate("in_russia", scroll)

    render(conn, "index.html", articles: articles, meta: meta)
  end

  def index(conn, _params) do
    %{entries: articles, metadata: meta} = Article.paginate("in_russia")

    render(conn, "index.html", articles: articles, meta: meta)
  end

  def show(conn, params) do
    render(conn, "show.html", article: Article.get(params["id"], type: "in_russia"))
  end
end
