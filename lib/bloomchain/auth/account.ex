defmodule Bloomchain.Auth.Account do
  alias Bloomchain.Repo
  alias Bloomchain.Content.User
  alias Bloomchain.Auth

  import Ecto.Query
  import Plug.Conn

  def get_user(id), do: Repo.get(User, id)

  def get_current_user(conn) do
    Auth.Guardian.Plug.current_resource(conn)
  end

  def authenticate_user(email, given_password) do
    query = from(u in User, where: u.email == ^email)

    Repo.one(query)
    |> check_password(given_password)
  end

  def login(conn, user) do
    conn
    |> Auth.Guardian.Plug.sign_in(user)
    |> assign(:current_user, user)
  end

  def logout(conn) do
    conn
    |> Auth.Guardian.Plug.sign_out()
  end

  # Private

  defp check_password(nil, _), do: {:error, "Incorrect email or password"}

  defp check_password(user, given_password) do
    case Bcrypt.verify_pass(given_password, user.password_hash) do
      true -> {:ok, user}
      false -> {:error, "Incorrect email or password"}
    end
  end
end
