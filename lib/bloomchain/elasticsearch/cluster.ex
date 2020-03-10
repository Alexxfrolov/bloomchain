defmodule Bloomchain.ElasticsearchCluster do
  use Elasticsearch.Cluster, otp_app: :bloomchain

  alias Bloomchain.ElasticsearchCluster, as: ES
  alias Bloomchain.Content.Post

  def search(query) do
    query = %{
      query: %{
        multi_match: %{
          query: query,
          fields: ["title^3", "lead^2", "body"]
        }
      },
      sort: [
        %{published_at: %{order: "desc"}},
        %{id: %{order: "desc"}}
      ],
      size: 6
    }

    with {:ok, result} <- Elasticsearch.post(ES, "/posts/_doc/_search/", query) do
      Enum.map(result["hits"]["hits"], &process_item/1)
    end
  end

  defp process_item(%{"_source" => post}) do
    struct(Post, keys_to_atoms(post))
    |> set_correct_dates
  end

  defp keys_to_atoms(string_key_map) when is_map(string_key_map) do
    for {key, val} <- string_key_map, into: %{}, do: {String.to_atom(key), keys_to_atoms(val)}
  end

  defp keys_to_atoms(string_key_list) when is_list(string_key_list) do
    string_key_list
    |> Enum.map(&keys_to_atoms/1)
  end

  defp keys_to_atoms(value), do: value

  defp set_correct_dates(post) do
    %{
      post
      | published_at: NaiveDateTime.from_iso8601!(post.published_at),
        inserted_at: NaiveDateTime.from_iso8601!(post.inserted_at),
        updated_at: NaiveDateTime.from_iso8601!(post.updated_at)
    }
  end
end
