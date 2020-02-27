defmodule BloomchainWeb.Admin.Api.V1.MediaController do
  use BloomchainWeb, :controller

  alias Plug.Conn
  alias Bloomchain.{Repo, Content.Media}
  alias BloomchainWeb.ErrorView

  def index(conn, _params) do
    media = Repo.all(Media)

    render(conn, "index.json", media: media)
  end

  def create(conn, params) do
  end

  def delete(conn, %{"id" => id}) do
    with media = %Media{} <- Repo.get(Media, id) do
      Repo.delete!(media)

      conn
      |> put_status(204)
      |> send_resp(:no_content, "")
    else
      nil ->
        conn
        |> put_status(404)
        |> render(ErrorView, "404.json", error: "Not found")
    end
  end
end
