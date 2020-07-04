defmodule BloomchainWeb.ArticleController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article
  alias BloomchainWeb.Workflow.RecomendationPosts

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
