defmodule BloomchainWeb.Admin.Api.V1.UserController do
  use BloomchainWeb, :controller

  require Ecto.Query

  alias Bloomchain.{Repo, Content.User}
  alias BloomchainWeb.ErrorView
  alias Bloomchain.Auth.Account

  def index(conn, _params) do
    users =
      User
      |> Ecto.Query.order_by(desc: :inserted_at)
      |> Repo.all()

    render(conn, "index.json", users: users)
  end

  def create(conn, params) do
    changeset = User.create_changeset(%User{}, params)

    with {:ok, user} <- Repo.insert(changeset) do
      conn
      |> put_status(201)
      |> render("show.json", user: user)
    else
      {:error, changeset} ->
        conn
        |> put_status(422)
        |> render(ErrorView, "422.json", %{changeset: changeset})
    end
  end

  def show(conn, %{"id" => id}) do
    with user = %User{} <- Repo.get(User, id) do
      render(conn, "show.json", user: user)
    else
      nil ->
        conn
        |> put_status(404)
        |> render(ErrorView, "404.json", error: "Not found")
    end
  end

  def delete(conn, %{"id" => id}) do
    with %User{role: "admin"} <- Repo.get(User, id) do
      conn
      |> send_resp(:forbidden, "")
    else
      %User{} = user ->
        Repo.delete!(user)

        conn
        |> send_resp(:no_content, "")

      nil ->
        conn
        |> put_status(404)
        |> render(ErrorView, "404.json", error: "Not found")
    end
  end

  def update(conn, %{"id" => id} = params) do
    with %User{} = user <- Repo.get(User, id),
         {:ok, user} <- user |> User.create_changeset(params) |> Repo.update() do
      conn
      |> render("show.json", user: user)
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

  def current(conn, _params) do
    user = Account.get_current_user(conn)
    render(conn, "show.json", user: user)
  end
end
