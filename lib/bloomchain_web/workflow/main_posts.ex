defmodule BloomchainWeb.Workflow.MainPosts do
  alias Bloomchain.Repo
  alias Bloomchain.Content.Article

  def run() do
    [
      detailed: Article.published_posts("detailed") |> Repo.limit(3),
      newsfeed: Article.published_posts("newsfeed") |> Repo.limit(7),
      analysis: Article.published_posts("analysis") |> Repo.limit(3),
      people: Article.published_posts("people") |> Repo.limit(3),
      in_russia: Article.published_posts("in-russia") |> Repo.limit(3),
      calendar: Article.published_posts("calendar") |> Repo.limit(3)
      # research: Article.published_posts("research" ) |> Repo.limit(3),
    ]
  end
end
