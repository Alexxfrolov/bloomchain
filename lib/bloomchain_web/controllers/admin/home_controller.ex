defmodule BloomchainWeb.Admin.HomeController do
  use BloomchainWeb, :controller

  alias Bloomchain.Content.Blog


  def index(conn, _params) do
    posts = Blog.get_posts_list()
    context = %{
      total_posts: length(posts),
      published_posts: Enum.count(posts, fn post -> post.published end),
      draft_posts: Enum.count(posts, fn post -> not post.published end)
    }
    render(conn, "index.html", context: context)
  end

end