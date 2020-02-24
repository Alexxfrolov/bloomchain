defmodule BloomchainWeb.SessionController do
  use BloomchainWeb, :controller

  alias Bloomchain.Auth.Accounts

  def new(conn, _) do
    render(conn, "new.html")
  end

  def create(conn, %{"session" => %{"email" => email, "password" => password}}) do
    case Accounts.authenticate_user(email, password) do
      {:ok, user} ->
        conn
        |> Accounts.login(user)
        |> redirect_after_login(user)

      {:error, _} ->
        conn
        |> put_flash(:error, "Invalid email or password")
        |> render("new.html")
    end
  end

  def delete(conn, _) do
    conn
    |> Accounts.logout()
    |> redirect(to: page_path(conn, :index))
  end

  # Private

  defp redirect_after_login(conn, user) do
    case user.role == "admin" do
      true -> redirect(conn, to: admin_home_path(conn, :index))
      false -> redirect(conn, to: page_path(conn, :index))
    end
  end
end