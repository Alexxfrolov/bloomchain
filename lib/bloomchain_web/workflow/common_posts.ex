defmodule BloomchainWeb.Workflow.CommonPosts do
  alias Bloomchain.Repo
  alias Bloomchain.Content.{Article, Section}

  @limit 6

  def run(type) do
    Article.published_posts(type)
    |> Repo.paginate(
      cursor_fields: [:published_at, :id],
      sort_direction: :desc,
      limit: @limit
    )
    |> Map.merge(%{section: Repo.get_by!(Section, slug: type)})
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
