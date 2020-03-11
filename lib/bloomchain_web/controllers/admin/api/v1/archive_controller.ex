defmodule BloomchainWeb.Admin.Api.V1.ArchiveController do
  use BloomchainWeb, :controller

  require Ecto.Query

  alias Plug.Conn
  alias Bloomchain.{Repo, Content.Archive}
  alias BloomchainWeb.ErrorView

  def index(conn, _params) do
    archives =
      Archive
      |> Ecto.Query.order_by(desc: :inserted_at)
      |> Repo.all()
      |> Repo.preload([:cover, :pdf])

    render(conn, "index.json", archives: archives)
  end

  def show(conn, %{"id" => id}) do
    with archive = %Archive{} <- Repo.get(Archive, id) do
      render(conn, "show.json", archive: archive |> Repo.preload([:cover, :pdf]))
    else
      nil ->
        conn
        |> put_status(404)
        |> render(ErrorView, "404.json", error: "Not found")
    end
  end

  def create(conn, params) do
    changeset = Archive.create_changeset(%Archive{}, params)

    with {:ok, archive} <- Repo.insert(changeset) do
      conn
      |> Conn.put_status(201)
      |> render("show.json", archive: archive |> Repo.preload([:cover, :pdf]))
    else
      {:error, changeset} ->
        conn
        |> put_status(422)
        |> render(ErrorView, "422.json", %{changeset: changeset})
    end
  end

  def delete(conn, %{"id" => id}) do
    with archive = %Archive{} <- Repo.get(Archive, id) do
      Repo.delete!(archive)

      conn
      |> send_resp(:no_content, "")
    else
      nil ->
        conn
        |> put_status(404)
        |> render(ErrorView, "404.json", error: "Not found")
    end
  end

  def update(conn, %{"id" => id} = params) do
    with %Archive{} = archive <- Repo.get(Archive, id),
         {:ok, archive} <- archive |> Archive.create_changeset(params) |> Repo.update() do
      conn
      |> render("show.json", archive: archive |> Repo.preload([:cover, :pdf]))
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
