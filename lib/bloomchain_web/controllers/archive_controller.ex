defmodule BloomchainWeb.ArchiveController do
  use BloomchainWeb, :controller

  alias Bloomchain.Repo
  alias Bloomchain.Content.Archive

  def index(conn, _params) do
    data = Repo.all(Archive) |> Repo.preload([:cover, :pdf])

    render(conn, "index.html", data: data)
  end
end
