use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :bloomchain, BloomchainWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :bloomchain, Bloomchain.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: System.get_env("DB_USER"),
  password: System.get_env("DB_PASSWORD"),
  database: System.get_env("DB_NAME") || 'bloomchain_test',
  hostname: System.get_env("DB_HOST") || 'localhost',
  port: System.get_env("DB_PORT") || 5432,
  pool: Ecto.Adapters.SQL.Sandbox

# Arc Image Upload
config :arc,
  storage: Arc.Storage.Local
