defmodule BloomchainWeb.PageController do
  use BloomchainWeb, :controller

  # alias Bloomchain.Content.Blog
  # alias Bloomchain.Content.Post

  # def index(conn, _) do
  # posts = Blog.get_published_posts()
  # render(conn, "index.html", posts: posts)
  # end

  # def show(conn, %{"id" => slug}) do
  #   with %Post{} = post <- Blog.get(slug, true) do
  #     render(conn, "show.html", post: post)
  #   end
  # end

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def newsfeed(conn, _params) do
    render(conn, "newsfeed.html")
  end

  def detailed(conn, _params) do
    render(conn, "detailed.html")
  end

  def analysis(conn, _params) do
    render(conn, "analysis.html")
  end

  def people(conn, _params) do
    render(conn, "people.html")
  end

  def in_russia(conn, _params) do
    render(conn, "in_russia.html")
  end

  def calendar(conn, _params) do
    render(conn, "calendar.html")
  end

  def research(conn, _params) do
    render(conn, "research.html")
  end

  def show(conn, _params) do
    render(conn, "show.html")
  end
end
