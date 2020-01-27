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
config :bloomchain, Bloomchain.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "mXbg7+zLA2KqS6QpheEN347778/X50cJLE6NWr/q3c87iVRskndC0en9bGq1k98A",
  render_errors: [view: Bloomchain.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Bloomchain.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
