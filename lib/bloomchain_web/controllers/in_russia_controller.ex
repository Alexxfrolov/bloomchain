defmodule BloomchainWeb.InRussiaController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article
  alias BloomchainWeb.Workflow.CommonPosts

  def index(conn, %{scroll: scroll}) do
    %{entries: articles, metadata: meta} = CommonPosts.run("in-russia", scroll)

    conn
    |> put_resp_header("x-pagination-scroll", to_string(meta.after))
    |> put_layout(false)
    |> put_view(BloomchainWeb.SharedView)
    |> render("_article_block.html", articles: articles, meta: meta)
  end

  def index(conn, _params) do
    %{entries: articles, metadata: meta} = CommonPosts.run("in-russia")

    render(conn, "index.html",
      articles: articles,
      meta: meta,
      title: "Новости блокчейна и криптовалют в России - Bloomchain",
      description:
        "Читайте эксклюзивные новости о блокчейне и криптовалютах в России. Аналитические статьи, исследования, комментарии экспертов на Блумчейн.ру."
    )
  end

  def show(conn, %{slug: slug}) do
    article =
      slug
      |> Article.get(type: "in-russia")
      |> Article.inc_total_views()

    render(conn, "show.html",
      article: article,
      recomendations: Article.recomendations_for(article)
    )
  end
end
