use Mix.Config

config :bloomchain, Bloomchain.ElasticsearchCluster,
  api: Elasticsearch.API.HTTP,
  default_options: [
    timeout: 20_000,
    recv_timeout: 20_000,
    hackney: [pool: :pool_name]
  ],
  json_library: Poison,
  indexes: %{
    posts: %{
      settings: "priv/elasticsearch/post.json",
      store: Bloomchain.ElasticsearchStore,
      sources: [Bloomchain.Content.Post],
      bulk_page_size: 5000,
      # 15 seconds
      bulk_wait_interval: 15_000
    }
  }
