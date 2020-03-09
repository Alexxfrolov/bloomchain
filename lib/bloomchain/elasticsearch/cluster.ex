defmodule Bloomchain.ElasticsearchCluster do
  use Elasticsearch.Cluster, otp_app: :bloomchain
end
