defmodule BloomchainWeb.SitemapView do
  use BloomchainWeb, :view
  import Ecto.Query

  alias Bloomchain.Repo
  alias Bloomchain.Content.{Post, Tag, Archive}

  def last_date(Post) do
    from(p in Post,
      select: [:published_at],
      where: p.status == "published",
      order_by: [desc: p.published_at],
      limit: 1
    )
    |> Repo.one()
    |> get_in([:published_at])
    |> format_date
  end

  def last_date(Tag) do
    from(p in Tag,
      select: [:updated_at],
      order_by: [desc: p.updated_at],
      limit: 1
    )
    |> Repo.one()
    |> get_in([:updated_at])
    |> format_date
  end

  def last_date("research-archive") do
    from(a in Archive,
      select: [:updated_at],
      order_by: [desc: a.updated_at],
      limit: 1
    )
    |> Repo.one()
    |> get_in([:updated_at])
    |> format_date
  end

  def last_date(type) do
    from(p in Post,
      select: [:published_at],
      where: p.status == "published" and p.type == ^type,
      order_by: [desc: p.published_at],
      limit: 1
    )
    |> Repo.one()
    |> get_in([:published_at])
    |> format_date
  end

  def format_date(nil), do: ""

  def format_date(datetime) do
    Timex.format!(Timex.to_datetime(datetime, "UTC"), "{ISO:Extended}")
  end
end
