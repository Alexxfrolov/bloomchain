defmodule BloomchainWeb.FeedController do
  use BloomchainWeb, :controller
  alias Bloomchain.Workflow.{MainPosts, NewsfeedPosts, CommonPosts}

  def index(conn, _params) do
    conn
    |> put_resp_content_type("application/rss+xml")
    |> render("index.xml",
      posts: MainPosts.run() |> Keyword.values() |> List.flatten(),
      type: nil
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

  def show(conn, %{type: type}) do
    %{entries: posts} = CommonPosts.run(type)

    conn
    |> put_resp_content_type("application/rss+xml")
    |> render("index.xml",
      posts: posts,
      type: type
    )
  end
end
