defmodule BloomchainWeb.Admin.Api.V1.MediaController do
  use BloomchainWeb, :controller

  alias Bloomchain.{Repo, Content.Media}

  def index(conn, %{type: type, editor: "true"}) do
    media = Media.list_all(type)

    render(conn, "editor.json", media: media)
  end

  def index(conn, %{type: type}) do
    media = Media.list_all(type)

    render(conn, "index.json", media: media)
  end

  def index(conn, _params) do
    media = Repo.all(Media)

    render(conn, "index.json", media: media)
  end

  def create(
        conn,
        %{file: %Plug.Upload{content_type: _, filename: _, path: _}, type: _} = params
      ) do
    media = Media.changeset(%Media{}, params) |> Repo.insert!()

    conn
    |> put_status(201)
    |> render("show.json", media: media)
  end

  def update(conn, %{id: id} = params) do
    media = Repo.get!(Media, id) |> Media.changeset(params) |> Repo.update!()

    conn
    |> render("show.json", media: media)
  end

  def delete(conn, %{id: id}) do
    Repo.get!(Media, id) |> Repo.delete!()

    send_resp(conn, :no_content, "")
  end
end
