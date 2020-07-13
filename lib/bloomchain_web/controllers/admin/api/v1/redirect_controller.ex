defmodule BloomchainWeb.Admin.Api.V1.RedirectController do
  use BloomchainWeb, :controller

  import BloomchainWeb.Plug.ValidParams
  import Bloomchain.Paginator

  alias Bloomchain.{Repo, Content.Redirect}

  plug :valid_filters, [:since, :until] when action in [:index]
  plug :valid_sort_params when action in [:index]

  def index(conn, params) do
    %{entries: items, metadata: meta} =
      Redirect
      |> Repo.q_filter_by(conn.assigns.filters)
      |> Repo.q_sort_by(conn.assigns.sort_params)
      |> paginate(params)

    render(conn, "index.json", items: items, meta: meta)
  end

  def create(conn, params) do
    item = Redirect.changeset(%Redirect{}, params) |> Repo.insert!()

    conn
    |> put_status(201)
    |> render("show.json", item: item)
  end

  def update(conn, %{id: id} = params) do
    item = Repo.get!(Redirect, id) |> Redirect.changeset(params) |> Repo.update!()

    render(conn, "show.json", item: item)
  end

  def delete(conn, %{id: id}) do
    Repo.get!(Redirect, id) |> Repo.delete!()

    send_resp(conn, :no_content, "")
  end
end
