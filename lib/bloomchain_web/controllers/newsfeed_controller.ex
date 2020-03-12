defmodule BloomchainWeb.NewsfeedController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article

  def index(conn, %{"scroll" => scroll, "last_date" => last_date}) do
    %{entries: articles, metadata: meta} = Article.paginate("newsfeed", scroll)

    conn
    |> put_resp_header("x-pagination-scroll", to_string(meta.after))
    |> put_resp_header("x-last-date", to_string(group(articles) |> Map.keys() |> Enum.min()))
    |> put_layout(false)
    |> render("_articles_block.html", articles: group(articles), previous_date: last_date)
  end

  def index(conn, _params) do
    %{entries: articles, metadata: meta} = Article.paginate("newsfeed")

    render(conn, "index.html", articles: group(articles), meta: meta)
  end

  def show(conn, %{slug: slug}) do
    article =
      slug
      |> Article.get(type: "newsfeed")
      |> Article.inc_total_views()

    render(conn, "show.html", article: article)
  end

  defp group(items) do
    Enum.group_by(items, &NaiveDateTime.to_date(&1.published_at))
  end
end
