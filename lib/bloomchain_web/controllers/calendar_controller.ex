defmodule BloomchainWeb.CalendarController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article

  def index(conn, %{"scroll" => scroll}) do
    %{entries: articles, metadata: meta} = Article.paginate("calendar", scroll)

    render(conn, "index.html", articles: articles, meta: meta)
  end

  def index(conn, _params) do
    %{entries: articles, metadata: meta} = Article.paginate("calendar")

    render(conn, "index.html", articles: articles, meta: meta)
  end

  def show(conn, params) do
    render(conn, "show.html", article: Article.get(params["id"], type: "calendar"))
  end
end
