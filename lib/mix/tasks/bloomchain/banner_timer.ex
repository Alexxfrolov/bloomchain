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

    from(
      p in Banner,
      where: p.status == "waiting" and field(p, :date_start) <= ^time_now
    )
    |> Repo.all()
    |> Enum.each(fn item ->
      item
      |> Banner.changeset(%{status: "active"})
      |> Repo.update!()
    end)
  end
end
