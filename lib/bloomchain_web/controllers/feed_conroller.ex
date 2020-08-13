defmodule BloomchainWeb.FeedController do
  use BloomchainWeb, :controller
  alias BloomchainWeb.ErrorView
  alias BloomchainWeb.Workflow.{MainPosts, NewsfeedPosts, CommonPosts}

  def index(conn, _params) do
    conn
    |> put_resp_content_type("application/rss+xml")
    |> render("index.xml",
      posts: MainPosts.run() |> Keyword.values() |> List.flatten(),
      type: "default"
    )
  end

  def show(conn, %{type: "newsfeed"}) do
    %{entries: posts} = NewsfeedPosts.run()

    conn
    |> put_resp_content_type("application/rss+xml")
    |> render("index.xml",
      posts: posts,
      type: "newsfeed"
    )
  end

  def show(conn, %{type: type})
      when type in ~w(detailed analysis people in-russia calendar research) do
    %{entries: posts} = CommonPosts.run(type)

    conn
    |> put_resp_content_type("application/rss+xml")
    |> render("index.xml",
      posts: posts,
      type: type
    )
  end

  def show(conn, _params) do
    conn
    |> put_status(404)
    |> put_view(ErrorView)
    |> render("404.xml")
  end
end
