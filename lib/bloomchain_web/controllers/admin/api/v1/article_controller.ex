defmodule BloomchainWeb.Admin.Api.V1.ArticleController do
  use BloomchainWeb, :controller

  import Bloomchain.Plug.ValidParams
  import Bloomchain.Paginator

  alias Bloomchain.Repo
  alias Bloomchain.Content.{Article, Post}
  alias BloomchainWeb.ErrorView

  plug :valid_filters, [:type, :status, :since, :until] when action in [:index]
  plug :valid_sort_params when action in [:index]

  def index(conn, %{type: type, status: status} = params) do
    %{entries: articles, metadata: meta} =
      Post
      |> Repo.q_filter_by(conn.assigns.filters)
      |> Repo.q_sort_by(conn.assigns.sort_params)
      |> paginate(params)

    render(conn, "index.json",
      articles: articles |> Repo.preload([:tags, :cover, :authors]),
      meta: meta
    )
  end

  def show(conn, %{id: id}) do
    article = Article.get!(id)

    render(conn, "show.json", article: article)
  end

  def create(conn, params) do
    with {:ok, article} <- Article.create(params) do
      conn
      |> put_status(201)
      |> render("show.json", article: article |> Repo.preload([:tags, :cover, :authors]))
    else
      {:error, changeset} ->
        conn
        |> put_status(422)
        |> render(ErrorView, "422.json", %{changeset: changeset})
    end
  end

  def update(conn, %{id: id} = params) do
    article = Article.get!(id)

    with {:ok, article} <- Article.update(article, params) do
      conn
      |> render("show.json", article: article)
    else
      {:error, changeset} ->
        conn
        |> put_status(422)
        |> render(ErrorView, "422.json", %{changeset: changeset})
    end
  end

  def delete(conn, %{id: id}) do
    Article.delete!(id)

    send_resp(conn, :no_content, "")
  end
end
