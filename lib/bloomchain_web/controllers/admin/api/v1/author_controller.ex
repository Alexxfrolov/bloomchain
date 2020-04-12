defmodule BloomchainWeb.Admin.Api.V1.AuthorController do
  use BloomchainWeb, :controller

  require Ecto.Query

  alias Bloomchain.{Repo, Content.Author}

  def index(conn, _params) do
    authors =
      Author
      |> Ecto.Query.order_by(desc: :inserted_at)
      |> Repo.all()

    render(conn, "index.json", authors: authors)
  end

  def create(conn, params) do
    author = Author.changeset(%Author{}, params) |> Repo.insert!()

    conn
    |> put_status(201)
    |> render("show.json", author: author)
  end

  def show(conn, %{id: id}) do
    author = Repo.get!(Author, id)

    render(conn, "show.json", author: author)
  end

  def delete(conn, %{id: id}) do
    Repo.get!(Author, id) |> Repo.delete!()

    send_resp(conn, :no_content, "")
  end

  def update(conn, %{id: id} = params) do
    author = Repo.get!(Author, id) |> Author.changeset(params) |> Repo.update!()

    render(conn, "show.json", author: author)
  end
end
