defmodule BloomchainWeb.Workflow.NewsfeedPosts do
  alias Bloomchain.Repo
  alias Bloomchain.Content.{Article, Section}

  @limit 12

  def run() do
    Article.published_posts("newsfeed")
    |> Repo.paginate(
      cursor_fields: [:published_at, :id],
      sort_direction: :desc,
      limit: @limit
    )
    |> Map.merge(%{section: Repo.get_by!(Section, slug: "newsfeed")})
  end

  def run(scroll) do
    Article.published_posts("newsfeed")
    |> Repo.paginate(
      after: scroll,
      cursor_fields: [:published_at, :id],
      sort_direction: :desc,
      limit: @limit
    )
  end
end
