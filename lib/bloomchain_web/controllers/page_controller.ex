defmodule BloomchainWeb.PageController do
  use BloomchainWeb, :controller

  alias Bloomchain.{Repo, Content.Subscriber, Content.Article}

  def index(conn, _params) do
    context = %{
      detailed: Article.get_published_posts("detailed", limit: 3),
      newsfeed: Article.get_published_posts("newsfeed", limit: 12),
      analysis: Article.get_published_posts("analysis", limit: 3),
      in_russia: Article.get_published_posts("in-russia", limit: 3),
      calendar: Article.get_published_posts("calendar", limit: 3),
      research: Article.get_published_posts("research", limit: 3)
    }

    render(conn, "index.html", context: context)
  end

  def create(conn, params) do
    changeset = Subscriber.changeset(%Subscriber{}, params)

    with {:ok, _} <- Repo.insert(changeset) do
      redirect(conn, to: page_path(conn, :index))
    else
      {:error, _} ->
        redirect(conn, to: page_path(conn, :index))
    end
  end
end
