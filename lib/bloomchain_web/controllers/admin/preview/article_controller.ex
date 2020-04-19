defmodule BloomchainWeb.Admin.Preview.ArticleController do
  use BloomchainWeb, :controller
  alias Bloomchain.Content.Article

  plug(:put_layout, {BloomchainWeb.LayoutView, :app})

  def show(conn, params) do
    article = Article.get(params[:slug], type: params[:type])

    render(conn, "show.html", article: article)
  end
end
