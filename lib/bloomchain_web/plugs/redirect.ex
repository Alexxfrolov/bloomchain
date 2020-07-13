defmodule BloomchainWeb.Plug.Redirect do
  import Plug.Conn

  alias Bloomchain.{Repo, Content.Redirect}

  def init(_params), do: nil

  @doc """
   Check if url was changed so user is redirected to active url
  """
  def call(conn, _params) do
    if redirect = Repo.get_by(Redirect, path_from: conn.request_path) do
      conn
      |> put_resp_header("location", redirect.path_to)
      |> send_resp(302, redirect.path_to)
      |> halt()
    else
      conn
    end
  end
end
