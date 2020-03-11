defmodule BloomchainWeb.Admin.Api.V1.TagController do
  use BloomchainWeb, :controller

  require Ecto.Query

  alias Plug.Conn
  alias Bloomchain.{Repo, Content.Tag}
  alias BloomchainWeb.ErrorView

  def index(conn, _params) do
    tags =
      Tag
      |> Ecto.Query.order_by(desc: :inserted_at)
      |> Repo.all()

    render(conn, "index.json", tags: tags)
  end

  def create(conn, params) do
    changeset = Tag.create_changeset(%Tag{}, params)

    with {:ok, tag} <- Repo.insert(changeset) do
      conn
      |> Conn.put_status(201)
      |> render("show.json", tag: tag)
    else
      {:error, changeset} ->
        conn
        |> put_status(422)
        |> render(ErrorView, "422.json", %{changeset: changeset})
    end
  end

  def delete(conn, %{"id" => id}) do
    with tag = %Tag{} <- Repo.get(Tag, id) do
      Repo.delete!(tag)

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
