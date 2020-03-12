defmodule Bloomchain.ElasticsearchStore do
  @behaviour Elasticsearch.Store

  alias Bloomchain.Repo

  @impl true
  def stream(schema) do
    schema
    |> Repo.stream()
    |> Repo.stream_preload(size: 100, preloads: [:authors, :cover, :tags])
  end

  @impl true
  def transaction(fun) do
    {:ok, result} = Repo.transaction(fun, timeout: :infinity)
    result
  end
end
