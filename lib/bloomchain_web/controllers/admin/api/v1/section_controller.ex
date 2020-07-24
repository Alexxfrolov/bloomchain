defmodule BloomchainWeb.Admin.Api.V1.SectionController do
  use BloomchainWeb, :controller

  import BloomchainWeb.Plug.ValidParams
  import Bloomchain.Paginator

  alias Bloomchain.{Repo, Content.Section}

  plug :valid_filters, [:since, :until] when action in [:index]
  plug :valid_sort_params when action in [:index]

  def index(conn, params) do
    %{entries: items, metadata: meta} =
      Section
      |> Repo.q_filter_by(conn.assigns.filters)
      |> Repo.q_sort_by(conn.assigns.sort_params)
      |> paginate(params)

    render(conn, "index.json", items: items, meta: meta)
  end

  def create(conn, params) do
    item = Section.changeset(%Section{}, params) |> Repo.insert!()

    conn
    |> put_status(201)
    |> render("show.json", item: item)
  end

  def update(conn, %{id: id} = params) do
    item = Repo.get!(Section, id) |> Section.changeset(params) |> Repo.update!()

    render(conn, "show.json", item: item)
  end

  def delete(conn, %{id: id}) do
    Repo.get!(Section, id) |> Repo.delete!()

    send_resp(conn, :no_content, "")
  end
end
