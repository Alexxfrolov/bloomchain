defmodule BloomchainWeb.PageController do
  use BloomchainWeb, :controller

  alias Bloomchain.Content.Article

  def index(conn, _params) do
    context = %{
      detailed: Article.get_published_posts("detailed", limit: 3),
      newsfeed: Article.get_published_posts("newsfeed", limit: 7),
      analysis: Article.get_published_posts("analysis", limit: 3),
      in_russia: Article.get_published_posts("in_russia", limit: 3),
      calendar: Article.get_published_posts("calendar", limit: 3),
      person: Article.get_published_posts("person", limit: 3)
    }

    render(conn, "index.html", context: context)
  end
end
