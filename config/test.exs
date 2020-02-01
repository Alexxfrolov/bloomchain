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
  username: "myapp",
  password: "password1",
  database: "bloomchain_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
