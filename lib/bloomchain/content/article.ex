defmodule Bloomchain.Content.Article do
  import Ecto.Query

  alias Bloomchain.Repo
  alias Bloomchain.Content.Post
  alias Bloomchain.ElasticsearchCluster, as: ES

  def published_posts(type) do
    from(
      p in Post,
      where: p.type == ^type and p.status == "published",
      preload: [:cover, :authors],
      order_by: [desc: p.published_at, desc: p.id]
    )
  end

  def get!(id) do
    Repo.get!(Post, id)
    |> Repo.preload([:tags, :cover, :authors])
  end

  def get(slug, type: type) do
    Repo.get_by!(Post, slug: slug, type: type, status: "published")
    |> Repo.preload([:tags, :cover, :authors])
  end

  def create(%{} = params) do
    with {:ok, post} <- %Post{} |> Post.changeset(params) |> Repo.insert() do
      Task.async(fn -> ES.reindex(post) end)
      {:ok, post}
    else
      {:error, changeset} ->
        {:error, changeset}
    end
  end

  def update(%Post{} = post, %{} = params) do
    with {:ok, post} <- post |> Post.changeset(params) |> Repo.update() do
      post = post |> Repo.preload([:tags, :cover, :authors], force: true)
      Task.async(fn -> ES.reindex(post) end)
      {:ok, post}
    else
      {:error, changeset} ->
        {:error, changeset}
    end
  end

  def delete!(id) do
    post = Repo.get!(Post, id)

    Repo.delete!(post)

    Task.async(fn -> ES.delete(post) end)
  end

  def inc_total_views(%Post{} = post) do
    Task.async(fn ->
      {1, [%Post{total_views: total_views}]} =
        from(p in Post, where: p.id == ^post.id, select: [:total_views])
        |> Repo.update_all(inc: [total_views: 1])

      ES.update(post, %{total_views: total_views})
    end)

    post
  end

  def recomendations_for(post) do
    query = %{
      query: %{
        function_score: %{
          query: %{
            bool: %{
              must: %{match_all: %{}},
              filter: [%{term: %{status: "published"}}],
              must_not: [%{term: %{id: post.id}}]
            }
          },
          functions:
            [
              %{
                gauss: %{
                  published_at: %{
                    origin: Timex.now() |> Timex.shift(days: -1),
                    scale: "24h",
                    offset: "4h",
                    decay: 0.5
                  }
                }
              },
              %{
                filter: %{term: %{type: post.type}},
                weight: 4
              }
            ] ++ tags_functions(post.tags),
          score_mode: "sum"
        }
      },
      size: 4
    }

    ES.search(query)[:entries]
  end

  defp tags_functions([]), do: []

  defp tags_functions(tags) do
    weight = 10 / length(tags)

    Enum.map(tags, fn tag ->
      %{
        filter: %{term: %{"tags.slug": tag.slug}},
        weight: weight
      }
    end)
  end
end
