defmodule BloomchainWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :bloomchain

  # socket("/socket", BloomchainWeb.UserSocket)

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.

  plug(Plug.Static, at: "/uploads", from: Path.expand('./uploads'), gzip: true)

  plug(
    Plug.Static,
    at: "/",
    from: "priv/static",
    gzip: true,
    only: ~w(customer grapejs admin robots.txt ads.txt)
  )

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison,
    xml_decoder: :xmerl_scan,
    length: 50_000_000

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket("/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket)
    plug(Phoenix.LiveReloader)
    plug(Phoenix.CodeReloader)
  end

  plug(Plug.Logger)

  plug(Plug.MethodOverride)
  plug(Plug.Head)

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug(
    Plug.Session,
    store: :cookie,
    key: "_bloomchain_key",
    signing_salt: "XzuQY6cr"
  )

  plug(BloomchainWeb.Router)

  @doc """
  Callback invoked for dynamically configuring the endpoint.

  It receives the endpoint configuration and checks if
  configuration should be loaded from the system environment.
  """
  def init(_key, config) do
    if config[:load_from_system_env] do
      port = System.get_env("PORT") || raise "expected the PORT environment variable to be set"
      {:ok, Keyword.put(config, :http, [:inet6, port: port, compress: true])}
    else
      {:ok, config}
    end
  end
end
