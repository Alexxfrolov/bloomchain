defmodule BloomchainWeb.Admin.Api.V1.TagController do
  use BloomchainWeb, :controller
  import Bloomchain.Plug.ValidParams
  alias Bloomchain.{Repo, Content.Tag}

  plug :valid_sort_params when action in [:index]

  def index(conn, _params) do
    tags =
      Tag
      |> Repo.q_sort_by(conn.assigns.sort_params)
      |> Repo.all()

    render(conn, "index.json", tags: tags)
  end

  def create(conn, params) do
    tag = Tag.changeset(%Tag{}, params) |> Repo.insert!()

    conn
    |> put_status(201)
    |> render("show.json", tag: tag)
  end

  def delete(conn, %{id: id}) do
    Repo.get!(Tag, id) |> Repo.delete!()

    send_resp(conn, :no_content, "")
  end
end
