defmodule BloomchainWeb.Admin.Api.V1.AuthorController do
  use BloomchainWeb, :controller

  require Ecto.Query

  alias Bloomchain.{Repo, Content.Author}
  alias BloomchainWeb.ErrorView

  def index(conn, _params) do
    authors =
      Author
      |> Ecto.Query.order_by(desc: :inserted_at)
      |> Repo.all()

    render(conn, "index.json", authors: authors)
  end

  def create(conn, params) do
    changeset = Author.changeset(%Author{}, params)

    with {:ok, author} <- Repo.insert(changeset) do
      conn
      |> put_status(201)
      |> render("show.json", author: author)
    else
      {:error, changeset} ->
        conn
        |> put_status(422)
        |> render(ErrorView, "422.json", %{changeset: changeset})
    end
  end

  def show(conn, %{id: id}) do
    with author = %Author{} <- Repo.get(Author, id) do
      render(conn, "show.json", author: author)
    else
      nil ->
        conn
        |> put_status(404)
        |> render(ErrorView, "404.json", error: "Not found")
    end
  end

  def delete(conn, %{id: id}) do
    with author = %Author{} <- Repo.get(Author, id) do
      Repo.delete!(author)

      conn
      |> send_resp(:no_content, "")
    else
      nil ->
        conn
        |> put_status(404)
        |> render(ErrorView, "404.json", error: "Not found")
    end
  end

  def update(conn, %{id: id} = params) do
    with %Author{} = author <- Repo.get(Author, id),
         {:ok, author} <- author |> Author.changeset(params) |> Repo.update() do
      conn
      |> render("show.json", author: author)
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
end
