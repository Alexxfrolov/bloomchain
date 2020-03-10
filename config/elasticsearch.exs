use Mix.Config

config :bloomchain, Bloomchain.ElasticsearchCluster,
  # The URL where Elasticsearch is hosted on your system
  url: "https://afc0043ba3df4afc91d49e5c31687c1a.eu-central-1.aws.cloud.es.io:9243",

  # If your Elasticsearch cluster uses HTTP basic authentication,
  # specify the username and password here:
  username: "elastic",
  password: "TMEYpCUhKqbOGnKp1BNbQL1Q",

  # If you want to mock the responses of the Elasticsearch JSON API
  # for testing or other purposes, you can inject a different module
  # here. It must implement the Elasticsearch.API behaviour.
  api: Elasticsearch.API.HTTP,
  default_options: [
    timeout: 10_000,
    recv_timeout: 10_000,
    hackney: [pool: :pool_name]
  ],

  # Customize the library used for JSON encoding/decoding.
  # or Jason
  json_library: Poison,

  # You should configure each index which you maintain in Elasticsearch here.
  # This configuration will be read by the `mix elasticsearch.build` task,
  # described below.
  indexes: %{
    # This is the base name of the Elasticsearch index. Each index will be
    # built with a timestamp included in the name, like "posts-5902341238".
    # It will then be aliased to "posts" for easy querying.
    posts: %{
      # This file describes the mappings and settings for your index. It will
      # be posted as-is to Elasticsearch when you create your index, and
      # therefore allows all the settings you could post directly.
      settings: "priv/elasticsearch/post.json",

      # This store module must implement a store behaviour. It will be used to
      # fetch data for each source in each indexes' `sources` list, below:
      store: Bloomchain.ElasticsearchStore,

      # This is the list of data sources that should be used to populate this
      # index. The `:store` module above will be passed each one of these
      # sources for fetching.
      #
      # Each piece of data that is returned by the store must implement the
      # Elasticsearch.Document protocol.
      sources: [Bloomchain.Content.Post],

      # When indexing data using the `mix elasticsearch.build` task,
      # control the data ingestion rate by raising or lowering the number
      # of items to send in each bulk request.
      bulk_page_size: 5000,

      # Likewise, wait a given period between posting pages to give
      # Elasticsearch time to catch up.
      # 15 seconds
      bulk_wait_interval: 15_000
    }
  }