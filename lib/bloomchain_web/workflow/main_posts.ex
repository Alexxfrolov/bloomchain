defmodule BloomchainWeb.Workflow.MainPosts do
  alias Bloomchain.Repo
  alias Bloomchain.Content.Article

  def run() do
    [
      detailed: Article.published_posts("detailed") |> Repo.limit(7),
      newsfeed: Article.published_posts("newsfeed") |> Repo.limit(14),
      analysis: Article.published_posts("analysis") |> Repo.limit(7),
      people: Article.published_posts("people") |> Repo.limit(7),
      # in_russia: Article.published_posts("in-russia") |> Repo.limit(7),
      calendar: Article.published_posts("calendar") |> Repo.limit(7),
      research: Article.published_posts("research") |> Repo.limit(7)
    ]
  end
end
