defmodule BloomchainWeb.Plug.EnsureAuthentication do

  use Guardian.Plug.Pipeline,
    otp_app: :bloomchain,
    module: Bloomchain.Auth.Guardian

  plug Guardian.Plug.EnsureAuthenticated

end