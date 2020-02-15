defmodule BloomchainWeb.ResearchController do
  use BloomchainWeb, :controller

  # def index(conn, _params) do
  #   render(conn, "index.html")
  # end

  def show(conn, _params) do
    article =
      Bloomchain.Repo.get!(Bloomchain.Content.Post, conn.params["id"])
      |> Bloomchain.Repo.preload(:user)

    render(conn, "show.html", article: article)
  end
end
