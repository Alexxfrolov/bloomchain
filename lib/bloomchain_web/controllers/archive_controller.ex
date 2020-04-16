defmodule BloomchainWeb.ArchiveController do
  use BloomchainWeb, :controller

  require Ecto.Query

  alias Bloomchain.Repo
  alias Bloomchain.Content.Archive

  def index(conn, _params) do
    data =
      Archive
      |> Ecto.Query.order_by(desc: :inserted_at)
      |> Repo.all()
      |> Repo.preload([:cover, :pdf])

    render(conn, "index.html",
      data: data,
      title: "Исследования — Bloomchain",
      description:
        "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"
    )
  end
end
