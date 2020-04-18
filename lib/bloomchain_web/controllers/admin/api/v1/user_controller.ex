defmodule BloomchainWeb.Admin.Api.V1.UserController do
  use BloomchainWeb, :controller
  import Bloomchain.Plug.ValidParams

  alias Bloomchain.{Repo, Content.User, Content.Author}
  alias Bloomchain.Auth.Account

  def index(conn, _params) do
    users =
      User
      |> Repo.q_sort_by(conn.assigns.sort_params)
      |> Repo.all()

    render(conn, "index.json", users: users)
  end

  def create(conn, params) do
    user = User.changeset(%User{}, params) |> Repo.insert!()

    Author.changeset(%Author{}, %{
      user_id: user.id,
      name: user.last_name <> " " <> user.first_name
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
      name: params[:last_name] <> " " <> params[:first_name]
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
