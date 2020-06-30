defmodule BloomchainWeb.AnalysisController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article
  alias Bloomchain.Workflow.CommonPosts

  def index(conn, %{scroll: scroll}) do
    %{entries: articles, metadata: meta} = CommonPosts.run("analysis", scroll)

    conn
    |> put_resp_header("x-pagination-scroll", to_string(meta.after))
    |> put_layout(false)
    |> put_view(BloomchainWeb.SharedView)
    |> render("_article_block.html", articles: articles, meta: meta)
  end

  def index(conn, _params) do
    %{entries: articles, metadata: meta} = CommonPosts.run("analysis")

    render(conn, "index.html",
      articles: articles,
      meta: meta,
      title: "Биткоин к доллару | График BTC/USD | Анализ криптовалют | Статистика)",
      description:
        "График биткоина к доллару (BTC/USD) на сегодня. Технический анализ криптовалют bitcoin, ethereum, ripple и других от специалистов рынка на портале Блумчейн.ру. Криптовалютная статистика, аналитика, мнения экспертов."
    )
  end

  def show(conn, %{slug: slug}) do
    article =
      slug
      |> Article.get(type: "analysis")
      |> Article.inc_total_views()

    render(conn, "show.html",
      article: article,
      recomendations: Article.recomendations_for(article)
    )
  end
end
