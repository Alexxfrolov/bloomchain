defmodule BloomchainWeb.Admin.Preview.ArticleController do
  use BloomchainWeb, :controller
  alias Bloomchain.Repo
  alias Bloomchain.Content.Post

  plug(:put_layout, {BloomchainWeb.LayoutView, :app})

  def show(conn, params) do
    article =
      Repo.get_by!(Post, slug: params[:slug], type: params[:type])
      |> Repo.preload([:tags, :cover, :authors])

    render(conn, "show.html", article: article)
  end
end
