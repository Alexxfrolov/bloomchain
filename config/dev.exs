use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :bloomchain, BloomchainWeb.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [
    yarn: [
      "run",
      "watch",
      cd: Path.expand("../assets", __DIR__)
    ]
  ]

# Watch static and templates for browser reloading.
config :bloomchain, BloomchainWeb.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/customer/*/*.*(js|css|jpg|svg|png|ico|txt|ttf|woff|woff2|eot)$},
      ~r{priv/static/admin/*/*.*(js|css|jpg|svg|png|ico|txt)$},
      ~r{priv/gettext/.*(po)$},
      ~r{lib/bloomchain_web/views/.*(ex)$},
      ~r{lib/bloomchain_web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :bloomchain, Bloomchain.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: System.get_env("DB_USER"),
  password: System.get_env("DB_PASSWORD"),
  database: System.get_env("DB_NAME") || 'bloomchain_dev',
  hostname: System.get_env("DB_HOST") || 'localhost',
  port: System.get_env("DB_PORT") || 5432,
  pool_size: 10

# # Waffle Image Upload
config :waffle,
  storage: Waffle.Storage.Local
