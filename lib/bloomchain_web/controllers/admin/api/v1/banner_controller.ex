defmodule BloomchainWeb.Admin.Api.V1.BannerController do
  use BloomchainWeb, :controller

  import BloomchainWeb.Plug.ValidParams
  import Bloomchain.Paginator

  alias Bloomchain.{Repo, Content.Banner}

  plug :valid_filters, [:type, :status, :since, :until] when action in [:index]
  plug :valid_sort_params when action in [:index]

  def index(conn, params) do
    %{entries: items, metadata: meta} =
      Banner
      |> Repo.q_filter_by(conn.assigns.filters)
      |> Repo.q_sort_by(conn.assigns.sort_params)
      |> paginate(params)

    render(conn, "index.json",
      items: items |> Repo.preload([:desktop_cover, :mobile_cover]),
      meta: meta
    )
  end

  def create(conn, params) do
    item =
      Banner.changeset(%Banner{}, params)
      |> Repo.insert!()
      |> Repo.preload([:desktop_cover, :mobile_cover])

    conn
    |> put_status(201)
    |> render("show.json", item: item)
  end

  def show(conn, %{id: id}) do
    item = Repo.get!(Banner, id) |> Repo.preload([:desktop_cover, :mobile_cover])

    conn
    |> render("show.json", item: item)
  end

  def update(conn, %{id: id} = params) do
    item =
      Repo.get!(Banner, id)
      |> Banner.changeset(params)
      |> Repo.update!()
      |> Repo.preload([:desktop_cover, :mobile_cover])

    conn
    |> render("show.json", item: item)
  end

  def delete(conn, %{id: id}) do
    Repo.get!(Banner, id) |> Repo.delete!()

    send_resp(conn, :no_content, "")
  end
end
