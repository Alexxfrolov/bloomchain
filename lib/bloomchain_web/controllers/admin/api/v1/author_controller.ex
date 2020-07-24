defmodule BloomchainWeb.Admin.Api.V1.AuthorController do
  use BloomchainWeb, :controller

  import BloomchainWeb.Plug.ValidParams
  import Bloomchain.Paginator

  alias Bloomchain.{Repo, Content.Author}

  plug :valid_filters, [:since, :until] when action in [:index]
  plug :valid_sort_params when action in [:index]

  def index(conn, params) do
    %{entries: authors, metadata: meta} =
      Author
      |> Repo.q_filter_by(conn.assigns.filters)
      |> Repo.q_sort_by(conn.assigns.sort_params)
      |> paginate(params)

    render(conn, "index.json", authors: authors |> Repo.preload([:post_ids]), meta: meta)
  end

  def create(conn, params) do
    author = Author.changeset(%Author{}, params) |> Repo.insert!()

    conn
    |> put_status(201)
    |> render("show.json", author: author |> Repo.preload([:post_ids]))
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
