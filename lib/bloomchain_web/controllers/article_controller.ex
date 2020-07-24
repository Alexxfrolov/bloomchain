defmodule BloomchainWeb.ArticleController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article
  alias BloomchainWeb.Workflow.CommonPosts
  alias BloomchainWeb.Workflow.RecomendationPosts

  def index(conn, %{type: type, scroll: scroll}) do
    %{entries: articles, metadata: meta} = CommonPosts.run(type, scroll)

    conn
    |> put_resp_header("x-pagination-scroll", to_string(meta.after))
    |> put_layout(false)
    |> put_view(BloomchainWeb.SharedView)
    |> render("_article_block.html", articles: articles, meta: meta)
  end

  def index(conn, %{type: type}) do
    %{entries: articles, metadata: meta, section: section} = CommonPosts.run(type)

    render(conn, "index.html",
      articles: articles,
      meta: meta,
      title: section.seo_settings.title,
      description: section.seo_settings.description
    )
  end

  def show(conn, %{type: type, slug: slug}) do
    article =
      slug
      |> Article.get(type: type)
      |> Article.inc_total_views()

    %{entries: recomendations} = RecomendationPosts.run(article)

    render(conn, "show.html",
      article: article,
      recomendations: recomendations
    )
  end
end
