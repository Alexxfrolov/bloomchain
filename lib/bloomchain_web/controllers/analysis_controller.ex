defmodule BloomchainWeb.AnalysisController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article

  def index(conn, %{"scroll" => scroll}) do
    %{entries: articles, metadata: meta} = Article.paginate("analysis", scroll)

    conn
    |> put_layout(false)
    |> put_view(BloomchainWeb.SharedView)
    |> render("_article_block.html", articles: articles, meta: meta)
  end

  def index(conn, _params) do
    %{entries: articles, metadata: meta} = Article.paginate("analysis")

    render(conn, "index.html", articles: articles, meta: meta)
  end

  def show(conn, params) do
    render(conn, "show.html", article: Article.get(params["id"], type: "analysis"))
  end
end
