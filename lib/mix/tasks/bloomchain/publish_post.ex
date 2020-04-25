defmodule Mix.Tasks.Bloomchain.PublishPost do
  use Mix.Task

  import Ecto.Query

  alias Bloomchain.Repo
  alias Bloomchain.Content.Post
  alias Bloomchain.ElasticsearchCluster, as: ES

  @shortdoc "Проставляет статус \"Опубликовано\" для отложенных публикаций"
  def run(_) do
    # start the Repo for interacting with data
    Mix.Task.run("app.start")

    time_now = Timex.now()

    from(
      p in Post,
      where: p.status == "ready" and field(p, :published_at) <= ^time_now
    )
    |> Repo.update_all(set: [status: "published"])

    {status, _} = do_query(time_now) |> ES.update_by_query()
    IO.puts(status)
  end

  defp do_query(time_now) do
    %{
      script: %{
        source: "ctx._source.status=\"published\"",
        lang: "painless"
      },
      query: %{
        bool: %{
          must: [
            %{term: %{status: "ready"}},
            %{range: %{published_at: %{lte: time_now |> Timex.format!("{ISO:Extended}")}}}
          ]
        }
      }
    }
  end
end
