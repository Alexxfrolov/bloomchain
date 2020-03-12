defmodule BloomchainWeb.Admin.Api.V1.ArticleController do
  use BloomchainWeb, :controller

  alias Bloomchain.Repo
  alias Bloomchain.Content.{Article, Post}
  alias BloomchainWeb.ErrorView

  def index(conn, %{"type" => type, "status" => status} = params) do
    articles =
      case {params["date_start"], params["date_end"]} do
        {nil, nil} -> Article.get_posts_list(type, status)
        {since, nil} -> Article.get_posts_list(type, status, since: since)
        {nil, until} -> Article.get_posts_list(type, status, until: until)
        {since, until} -> Article.get_posts_list(type, status, since: since, until: until)
      end

    render(conn, "index.json", articles: articles)
  end

  def show(conn, %{"id" => id}) do
    with article = %Post{} <- Article.get(id) do
      render(conn, "show.json", article: article)
    else
      nil ->
        conn
        |> put_status(404)
        |> render(ErrorView, "404.json", error: "Not found")
    end
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

  def update(conn, %{"id" => id} = params) do
    with article = %Post{} <- Article.get(id),
         {:ok, article} <- Article.update(article, params) do
      conn
      |> render("show.json", article: article)
    else
      nil ->
        conn
        |> put_status(404)
        |> render(ErrorView, "404.json", error: "Not found")

      {:error, changeset} ->
        conn
        |> put_status(422)
        |> render(ErrorView, "422.json", %{changeset: changeset})
    end
  end

  def delete(conn, %{"id" => id}) do
    with article = %Post{} <- Article.get(id) do
      Article.delete(article)

      conn
      |> send_resp(:no_content, "")
    else
      nil ->
        conn
        |> put_status(404)
        |> render(ErrorView, "404.json", error: "Not found")
    end
  end
end
