defmodule BloomchainWeb.Admin.Api.V1.TagController do
  use BloomchainWeb, :controller

  import Bloomchain.Plug.ValidParams
  import Bloomchain.Paginator

  alias Bloomchain.{Repo, Content.Tag}

  plug :valid_filters, [:since, :until] when action in [:index]
  plug :valid_sort_params when action in [:index]

  def index(conn, params) do
    %{entries: tags, metadata: meta} =
      Tag
      |> Repo.q_filter_by(conn.assigns.filters)
      |> Repo.q_sort_by(conn.assigns.sort_params)
      |> paginate(params)

    render(conn, "index.json", tags: tags |> Repo.preload([:post_ids]), meta: meta)
  end

  def create(conn, params) do
    tag = Tag.changeset(%Tag{}, params) |> Repo.insert!()

    conn
    |> put_status(201)
    |> render("show.json", tag: tag |> Repo.preload([:post_ids]))
  end

  def update(conn, %{id: id} = params) do
    tag = Repo.get!(Tag, id) |> Tag.changeset(params) |> Repo.update!()

    render(conn, "show.json", tag: tag)
  end

  def delete(conn, %{id: id}) do
    Repo.get!(Tag, id) |> Repo.delete!()

    send_resp(conn, :no_content, "")
  end
end
