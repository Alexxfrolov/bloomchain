defmodule Bloomchain.ElasticsearchCluster do
  use Elasticsearch.Cluster, otp_app: :bloomchain

  def search(_query) do
    query = %{"query" => %{"match_all" => %{}}, size: 1}

    with {:ok, result} <- Elasticsearch.post(ElasticsearchCluster, "/posts/_doc/_search", query) do
      result["hits"]
    end
  end
end
