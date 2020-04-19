defmodule Bloomchain.ElasticsearchCluster do
  use Elasticsearch.Cluster, otp_app: :bloomchain

  alias Bloomchain.ElasticsearchCluster, as: ES
  alias Bloomchain.Content.Post
  alias Bloomchain.Repo

  @max_size 6

  def reindex(struct) do
    post = Repo.preload(struct, [:authors, :tags, :cover])

    # make it async
    Elasticsearch.put_document(ES, post, "posts")

    {:ok, post}
  end

  def delete(struct) do
    # make it async
    Elasticsearch.delete_document(ES, struct, "posts")

    {:ok, struct}
  end

  def search(query) do
    process_result(Elasticsearch.post(ES, "/posts/_doc/_search/", query))
  end

  def search(query, scroll: scroll) do
    process_result(Elasticsearch.post(ES, "/posts/_doc/_search?scroll=#{scroll}", query))
  end

  def scroll(scroll) do
    query = %{
      scroll: "5m",
      scroll_id: scroll
    }

    process_result(Elasticsearch.post(ES, "/_search/scroll", query))
  end

  defp process_result(result) do
    with {:ok, result} <- result do
      scroll =
        if result["hits"]["total"] > @max_size and length(result["hits"]["hits"]) == @max_size do
          result["_scroll_id"]
        else
          nil
        end

      %{
        entries: Enum.map(result["hits"]["hits"], &process_item/1),
        metadata: %{
          after: scroll,
          total: result["hits"]["total"]["value"],
          size: length(result["hits"]["hits"])
        }
      }
    else
      {:error, _err} ->
        %{
          entries: [],
          metadata: %{error: true, after: nil}
        }
    end
  end

  defp process_item(%{"_source" => post}) do
    article =
      post
      |> keys_to_atoms
      |> transform_dates

    struct(Post, article)
  end

  defp keys_to_atoms(string_key_map) when is_map(string_key_map) do
    for {key, val} <- string_key_map, into: %{}, do: {String.to_atom(key), keys_to_atoms(val)}
  end

  defp keys_to_atoms(string_key_list) when is_list(string_key_list) do
    string_key_list
    |> Enum.map(&keys_to_atoms/1)
  end

  defp keys_to_atoms(value), do: value

  defp transform_dates(list) when is_list(list) do
    list
    |> Enum.map(&transform_dates/1)
  end

  defp transform_dates(%{published_at: _, inserted_at: _, updated_at: _} = item) do
    struct = %{
      item
      | published_at: NaiveDateTime.from_iso8601!(item.published_at),
        inserted_at: NaiveDateTime.from_iso8601!(item.inserted_at),
        updated_at: NaiveDateTime.from_iso8601!(item.updated_at)
    }

    for({key, value} <- struct, into: %{}, do: {key, transform_dates(value)})
  end

  defp transform_dates(%{inserted_at: _, updated_at: _} = item) do
    struct = %{
      item
      | inserted_at: NaiveDateTime.from_iso8601!(item.inserted_at),
        updated_at: NaiveDateTime.from_iso8601!(item.updated_at)
    }

    for({key, value} <- struct, into: %{}, do: {key, transform_dates(value)})
  end

  defp transform_dates(value), do: value

  defp set_correct_dates(item) do
    %{
      item
      | published_at: NaiveDateTime.from_iso8601!(item.published_at),
        inserted_at: NaiveDateTime.from_iso8601!(item.inserted_at),
        updated_at: NaiveDateTime.from_iso8601!(item.updated_at)
    }
  end
end
