defmodule BloomchainWeb.SitemapController do
  use BloomchainWeb, :controller
  import Ecto.Query

  alias Bloomchain.Repo
  alias Bloomchain.Content.{Post, Tag}

  plug(:accepts, ["text/xml"])
  plug(:put_layout, false)

  def index(conn, _) do
    posts =
      from(p in Post,
        select: [fragment("TO_CHAR(published_at :: DATE, 'yyyy-mm')"), p.updated_at],
        where: p.status == "published",
        order_by: [desc: :updated_at]
      )
      |> Repo.all()
      |> Enum.uniq_by(&List.first(&1))

    conn
    |> render("index.xml", posts: posts)
  end

  def show(conn, %{property: "resources.xml"}) do
    conn
    |> render("resources.xml",
      resources:
        ~w[newsfeed detailed analysis people in-russia calendar research research-archive]
    )
  end

  def show(conn, %{property: "tags.xml"}) do
    tags =
      from(t in Tag,
        select: %{slug: t.slug, updated_at: t.updated_at}
      )
      |> Repo.all()

    conn
    |> render("tags.xml", tags: tags)
  end
end
