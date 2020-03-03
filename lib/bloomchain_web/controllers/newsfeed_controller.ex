defmodule BloomchainWeb.NewsfeedController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article

  def index(conn, %{"scroll" => scroll, "last_date" => last_date}) do
    %{entries: articles, metadata: meta} = Article.paginate("newsfeed", scroll)

    conn
    |> put_layout(false)
    |> render(
      detect_template(articles, last_date),
      articles: group(articles),
      meta: meta,
      last_date: Date.from_iso8601!(last_date)
    )
  end

  def index(conn, _params) do
    %{entries: articles, metadata: meta} = Article.paginate("newsfeed")

    render(conn, "index.html", articles: group(articles), meta: meta)
  end

  def show(conn, params) do
    render(conn, "show.html", article: Article.get(params["id"], type: "newsfeed"))
  end

  defp group(items) do
    Enum.group_by(items, &NaiveDateTime.to_date(&1.published_at))
  end

  defp detect_template([item | _], date) do
    if Date.from_iso8601!(date) == NaiveDateTime.to_date(item.published_at) do
      "previous_index.html"
    else
      "index.html"
    end
  end

  defp detect_template(_, _) do
    "index.html"
  end
end
