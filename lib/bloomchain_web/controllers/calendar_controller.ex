defmodule BloomchainWeb.CalendarController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article
  alias BloomchainWeb.Workflow.CommonPosts

  def index(conn, %{scroll: scroll}) do
    %{entries: articles, metadata: meta} = CommonPosts.run("calendar", scroll)

    conn
    |> put_resp_header("x-pagination-scroll", to_string(meta.after))
    |> put_layout(false)
    |> put_view(BloomchainWeb.SharedView)
    |> render("_article_block.html", articles: articles, meta: meta)
  end

  def index(conn, _params) do
    %{entries: articles, metadata: meta} = CommonPosts.run("calendar")

    render(conn, "index.html",
      articles: articles,
      meta: meta,
      title: "Календарь событий в сфере блокчейна и криптовалют — Bloomchain",
      description:
        "Календарь предстоящих событий в сфере криптовалют и блокчейна. Следите за ближайшими событиями в криптовалютном мире на Блумчейн.ру."
    )
  end

  def show(conn, %{slug: slug}) do
    article =
      slug
      |> Article.get(type: "calendar")
      |> Article.inc_total_views()

    render(conn, "show.html",
      article: article,
      recomendations: Article.recomendations_for(article)
    )
  end
end
