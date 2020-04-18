defmodule BloomchainWeb.Admin.Api.V1.ArchiveController do
  use BloomchainWeb, :controller
  import Bloomchain.Plug.ValidParams

  alias Bloomchain.{Repo, Content.Archive}

  plug :valid_sort_params when action in [:index]

  def index(conn, _params) do
    archives =
      Archive
      |> Repo.q_sort_by(conn.assigns.sort_params)
      |> Repo.all()
      |> Repo.preload([:cover, :pdf])

    render(conn, "index.json", archives: archives)
  end

  def show(conn, %{id: id}) do
    archive = Repo.get!(Archive, id) |> Repo.preload([:cover, :pdf])

    render(conn, "show.json", archive: archive)
  end

  def create(conn, params) do
    archive =
      Archive.changeset(%Archive{}, params)
      |> Repo.insert!()
      |> Repo.preload([:cover, :pdf])

    conn
    |> put_status(201)
    |> render("show.json", archive: archive)
  end

  def delete(conn, %{id: id}) do
    Repo.get!(Archive, id) |> Repo.delete!()

    send_resp(conn, :no_content, "")
  end

  def update(conn, %{id: id} = params) do
    archive =
      Repo.get!(Archive, id)
      |> Archive.changeset(params)
      |> Repo.update!()
      |> Repo.preload([:cover, :pdf])

    render(conn, "show.json", archive: archive)
  end
end
