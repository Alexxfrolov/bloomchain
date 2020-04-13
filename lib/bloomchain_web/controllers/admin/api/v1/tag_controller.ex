defmodule BloomchainWeb.Admin.Api.V1.TagController do
  use BloomchainWeb, :controller

  require Ecto.Query

  alias Bloomchain.{Repo, Content.Tag}

  def index(conn, _params) do
    tags =
      Tag
      |> Ecto.Query.order_by(desc: :inserted_at)
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
