defmodule BloomchainWeb.SessionController do
  use BloomchainWeb, :controller

  alias Bloomchain.Auth.Account

  def new(conn, _) do
    render(conn, "new.html")
  end

  def create(conn, %{session: %{email: email, password: password}}) do
    case Account.authenticate_user(email, password) do
      {:ok, user} ->
        conn
        |> Account.login(user)
        |> redirect(to: admin_home_path(conn, :index))

      {:error, _} ->
        conn
        |> put_flash(:error, "Invalid email or password")
        |> render("new.html")
    end
  end

  def delete(conn, _) do
    conn
    |> Account.logout()
    |> send_resp(:no_content, "")
  end
end
