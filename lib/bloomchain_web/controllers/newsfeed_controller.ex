defmodule BloomchainWeb.NewsfeedController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article

  def index(conn, _params) do
    articles =
      Article.get_published_posts("newsfeed", limit: 30)
      |> Enum.group_by(&NaiveDateTime.to_date(&1.published_at))

    render(conn, "index.html", articles: articles)
  end

  def show(conn, params) do
    render(conn, "show.html", article: Article.get(params["id"], type: "newsfeed"))
  end
end
