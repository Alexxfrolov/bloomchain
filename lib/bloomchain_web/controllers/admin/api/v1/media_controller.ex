defmodule BloomchainWeb.Admin.Api.V1.MediaController do
  use BloomchainWeb, :controller

  import Bloomchain.Plug.ValidParams
  import Bloomchain.Paginator

  alias Bloomchain.{Repo, Content.Media}

  plug :valid_filters, [:type, :since, :until] when action in [:index]
  plug :valid_sort_params when action in [:index]

  def index(conn, %{editor: "true"} = params) do
    %{entries: media, metadata: meta} =
      Media
      |> Repo.q_filter_by(conn.assigns.filters)
      |> Repo.q_sort_by(conn.assigns.sort_params)
      |> paginate(params)

    render(conn, "editor.json", media: media, meta: meta)
  end

  def index(conn, params) do
    %{entries: media, metadata: meta} =
      Media
      |> Repo.q_filter_by(conn.assigns.filters)
      |> Repo.q_sort_by(conn.assigns.sort_params)
      |> paginate(params)

    render(conn, "index.json", media: media, meta: meta)
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

  def show(conn, %{id: id}) do
    media = Repo.get!(Media, id)

    conn
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
