defmodule BloomchainWeb.PageController do
  use BloomchainWeb, :controller

  alias BloomchainWeb.Workflow.MainPosts

  def index(conn, _params) do
    render(conn, "index.html", context: MainPosts.run())
  end
end
