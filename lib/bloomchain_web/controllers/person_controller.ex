defmodule BloomchainWeb.PersonController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article

  def index(conn, %{scroll: scroll}) do
    %{entries: articles, metadata: meta} = Article.paginate("person", scroll)

    conn
    |> put_resp_header("x-pagination-scroll", to_string(meta.after))
    |> put_layout(false)
    |> put_view(BloomchainWeb.SharedView)
    |> render("_article_block.html", articles: articles, meta: meta)
  end

  def index(conn, _params) do
    %{entries: articles, metadata: meta} = Article.paginate("person")

    render(conn, "index.html", articles: articles, meta: meta)
  end

  def show(conn, %{slug: slug}) do
    article =
      slug
      |> Article.get(type: "person")
      |> Article.inc_total_views()

    render(conn, "show.html",
      article: article,
      recomendations: Article.recomendations_for(article)
    )
  end
end
