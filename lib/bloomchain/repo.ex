defmodule Bloomchain.Repo do
  use Ecto.Repo,
    otp_app: :bloomchain,
    adapter: Ecto.Adapters.Postgres

  use Paginator
  require Ecto.Query
  alias Bloomchain.Repo

  @doc """
  Dynamically loads the repository url from the
  DATABASE_URL environment variable.
  """

  def init(_, opts) do
    {:ok, Keyword.put(opts, :url, System.get_env("DATABASE_URL"))}
  end

  def stream_preload(stream, size: size, preloads: preloads) do
    stream
    |> Stream.chunk_every(size)
    |> Stream.flat_map(fn chunk ->
      Repo.preload(chunk, preloads)
    end)
  end

  def q_sort_by(query, sort_params) do
    query
    |> Ecto.Query.order_by(^sort_params)
  end
end
