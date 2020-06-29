defmodule BloomchainWeb.FeedController do
  use BloomchainWeb, :controller
  import Ecto.Query

  alias Bloomchain.Repo
  alias Bloomchain.Content.Article
  alias Bloomchain.Workflow.{MainPosts, NewsfeedPosts, CommonPosts}

  def index(conn, _params) do
    conn
    |> render("index.xml",
      posts: MainPosts.run() |> Keyword.values() |> List.flatten(),
      type: nil
    )
  end

  def show(conn, %{type: "newsfeed"}) do
    %{entries: posts} = NewsfeedPosts.run()

    conn
    |> render("index.xml",
      posts: posts,
      type: "newsfeed"
    )
  end

  def show(conn, %{type: type}) do
    conn
    |> render("index.xml",
      posts: CommonPosts.run(),
      type: type
    )
  end
end
