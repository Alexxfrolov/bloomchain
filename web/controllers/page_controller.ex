defmodule Bloomchain.PageController do
  use Bloomchain.Web, :controller

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
