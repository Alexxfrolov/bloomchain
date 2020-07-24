defmodule BloomchainWeb.SectionController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Archive
  alias BloomchainWeb.Workflow.{CommonPosts, NewsfeedPosts}

  def index(conn, %{type: "newsfeed", scroll: scroll, last_date: last_date}) do
    %{entries: articles, metadata: meta} = NewsfeedPosts.run(scroll)

    conn
    |> put_resp_header("x-pagination-scroll", to_string(meta.after))
    |> put_resp_header(
      "x-last-date",
      articles |> group() |> Map.keys() |> Enum.min_by(&{&1.year, &1.month, &1.day}) |> to_string
    )
    |> put_layout(false)
    |> render("_newsfeed_block.html", articles: group(articles), previous_date: last_date)
  end

  def index(conn, %{type: type, scroll: scroll}) do
    %{entries: articles, metadata: meta} = CommonPosts.run(type, scroll)

    conn
    |> put_resp_header("x-pagination-scroll", to_string(meta.after))
    |> put_layout(false)
    |> put_view(BloomchainWeb.SharedView)
    |> render("_article_block.html", articles: articles, meta: meta)
  end

  def index(conn, %{type: "research-archive"}) do
    render(conn, "archive.html", data: Archive.all())
  end

  def index(conn, %{type: "analysis"}) do
    %{entries: articles, metadata: meta} = CommonPosts.run("analysis")

    render(conn, "analysis.html", articles: articles, meta: meta)
  end

  def index(conn, %{type: "newsfeed"}) do
    %{entries: articles, metadata: meta} = NewsfeedPosts.run()

    render(conn, "newsfeed.html", articles: group(articles), meta: meta)
  end

  def index(conn, %{type: type}) do
    %{entries: articles, metadata: meta} = CommonPosts.run(type)

    render(conn, "index.html", articles: articles, meta: meta)
  end

  defp group(items) do
    Enum.group_by(items, &NaiveDateTime.to_date(&1.published_at))
  end
end
