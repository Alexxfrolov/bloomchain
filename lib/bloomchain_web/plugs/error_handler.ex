defmodule Bloomchain.GuardianErrorHandler do
  use BloomchainWeb, :controller

  def auth_error(conn, _, _opts) do
    conn
    |> redirect(to: session_path(conn, :new))
  end
end
