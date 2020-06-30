defmodule Bloomchain.Workflow.NewsfeedPosts do
  alias Bloomchain.Repo
  alias Bloomchain.Content.Article

  @limit 12

  def run() do
    Article.published_posts("newsfeed")
    |> Repo.paginate(
      cursor_fields: [:published_at, :id],
      sort_direction: :desc,
      limit: @limit
    )
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
