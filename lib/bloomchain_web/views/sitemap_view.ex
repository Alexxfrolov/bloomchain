defmodule BloomchainWeb.SitemapView do
  use BloomchainWeb, :view
  import Ecto.Query

  alias Bloomchain.Repo
  alias Bloomchain.Content.{Post, Tag}

  def last_date(module) do
    from(p in module,
      select: [:updated_at],
      order_by: [desc: p.updated_at],
      limit: 1
    )
    |> Repo.one()
    |> get_in([:updated_at])
    |> format_date
  end

  def last_date(module, type) do
    from(p in module,
      select: [:updated_at],
      where: p.type == ^type,
      order_by: [desc: p.updated_at],
      limit: 1
    )
    |> Repo.one()
    |> get_in([:updated_at])
    |> format_date
  end

  def format_date(datetime) do
    Timex.format!(datetime, "{ISO:Extended:Z}")
  end
end
