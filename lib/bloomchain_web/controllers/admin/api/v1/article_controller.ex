defmodule BloomchainWeb.Admin.Api.V1.ArticleController do
  use BloomchainWeb, :controller

  alias Bloomchain.Repo
  alias Bloomchain.Content.Article
  alias BloomchainWeb.ErrorView

  def index(conn, %{type: type, status: status} = params) do
    articles =
      case {params[:date_start], params[:date_end]} do
        {nil, nil} -> Article.get_posts_list(type, status)
        {since, nil} -> Article.get_posts_list(type, status, since: since)
        {nil, until} -> Article.get_posts_list(type, status, until: until)
        {since, until} -> Article.get_posts_list(type, status, since: since, until: until)
      end

    render(conn, "index.json", articles: articles)
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
