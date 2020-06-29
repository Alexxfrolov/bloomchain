defmodule Bloomchain.Workflow.CommonPosts do
  import Ecto.Query

  alias Bloomchain.Repo
  alias Bloomchain.Content.{Article, Post}

  @limit 6

  def run(type) do
    Article.published_posts(type)
    |> Repo.paginate(
      cursor_fields: [:published_at, :id],
      sort_direction: :desc,
      limit: @limit
    )
  end

  def run(type, scroll) do
    Article.published_posts(type)
    |> Repo.paginate(
      after: scroll,
      cursor_fields: [:published_at, :id],
      sort_direction: :desc,
      limit: @limit
    )
  end
end