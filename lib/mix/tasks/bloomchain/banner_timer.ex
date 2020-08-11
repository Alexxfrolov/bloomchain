defmodule Mix.Tasks.Bloomchain.BannerTimer do
  use Mix.Task

  import Ecto.Query

  alias Bloomchain.{Repo, Content.Banner}

  @shortdoc "Таймер для баннеров"
  def run(_) do
    time_now = Timex.now()

    from(
      p in Banner,
      where: p.status == "active" and field(p, :date_end) <= ^time_now
    )
    |> Repo.update_all(set: [status: "unactive"])

    Repo.transaction(fn ->
      {count, _} =
        from(
          p in Banner,
          where: p.status == "waiting" and field(p, :date_start) <= ^time_now
        )
        |> Repo.update_all(set: [status: "active"])

      if count > 0 do
        from(b in Banner, where: b.status == "active")
        |> Repo.update_all(set: [total_views: 0])
      end
    end)
  end
end
