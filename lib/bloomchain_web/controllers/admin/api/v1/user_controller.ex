defmodule BloomchainWeb.Admin.Api.V1.UserController do
  use BloomchainWeb, :controller

  import Bloomchain.Plug.ValidParams
  import Bloomchain.Paginator

  alias Bloomchain.{Repo, Content.User, Content.Author, Auth.Account}

  plug :valid_filters, [:since, :until] when action in [:index]
  plug :valid_sort_params when action in [:index]

  def index(conn, params) do
    %{entries: users, metadata: meta} =
      User
      |> Repo.q_filter_by(conn.assigns.filters)
      |> Repo.q_sort_by(conn.assigns.sort_params)
      |> paginate(params)

    render(conn, "index.json", users: users, meta: meta)
  end

  def create(conn, params) do
    user = User.changeset(%User{}, params) |> Repo.insert!()

    Author.changeset(%Author{}, %{
      user_id: user.id,
      name: user.first_name <> " " <> user.last_name
    })
    |> Repo.insert!()

    conn
    |> put_status(201)
    |> render("show.json", user: user)
  end

  def show(conn, %{id: id}) do
    user = Repo.get!(User, id)

    render(conn, "show.json", user: user)
  end

  def delete(conn, %{id: id}) do
    with %User{role: "admin"} <- Repo.get!(User, id) do
      conn
      |> send_resp(:forbidden, "")
    else
      user ->
        Repo.delete!(user)

        conn
        |> send_resp(:no_content, "")
    end
  end

  def update(conn, %{id: id} = params) do
    user = Repo.get!(User, id) |> User.changeset(params) |> Repo.update!()

    Author.changeset((user |> Repo.preload(:author)).author, %{
      name: params[:first_name] <> " " <> params[:last_name]
    })
    |> Repo.update!()

    conn
    |> render("show.json", user: user)
  end

  def current(conn, _params) do
    user = Account.get_current_user(conn)

    render(conn, "show.json", user: user)
  end
end
