# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :bloomchain,
  ecto_repos: [Bloomchain.Repo]

# Configures the endpoint
config :bloomchain, BloomchainWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "qqb9LRArbAWUeMu0TIzAuR+EbrrzpvXvwIDgfMKIvT1ZyFQymmpUkRpuDGSDD+nX",
  render_errors: [view: BloomchainWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Bloomchain.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "elasticsearch.exs"
import_config "#{Mix.env()}.exs"

# Guardian
config :bloomchain, Bloomchain.Auth.Guardian,
  issuer: "Bloomchain",
  secret_key: "HNinpKh9NE3tr8BPJCpAEh0xzCqTIG3PWsfkR2AtzvUaRIpbs6oIQ9RcmjmGPekJ"
