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
        select: %{
          slug: fragment("TO_CHAR(published_at :: DATE, 'yyyy-mm')"),
          updated_at: p.published_at
        },
        where: p.status == "published",
        order_by: [desc: :published_at]
      )
      |> Repo.all()
      |> Enum.uniq_by(& &1.slug)

    conn
    |> render("index.xml", posts: posts)
  end

  def show(conn, %{property: "main.xml"}) do
    conn
    |> render("main.xml")
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

  def show(conn, %{property: property}) do
    [year | [month, _]] = String.split(property, ["posts-", "-", ".xml"]) |> tl()
    year = String.to_integer(year)
    month = String.to_integer(month)

    date_start = Timex.to_datetime({year, month, 1})

    date_end =
      Timex.to_datetime(
        {{year, month, :calendar.last_day_of_the_month(year, month)}, {23, 59, 59}}
      )

    posts =
      from(p in Post,
        select: %{slug: p.slug, type: p.type, updated_at: p.published_at},
        where:
          p.status == "published" and p.published_at >= ^date_start and
            p.published_at <= ^date_end,
        limit: 10_000
      )
      |> Repo.all()

    conn
    |> render("posts.xml", posts: posts)
  end
end
