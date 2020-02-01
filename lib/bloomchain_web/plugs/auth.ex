defmodule Bloomchain.Plug.Authentication do

  use Guardian.Plug.Pipeline,
    otp_app: :bloomchain,
    error_handler: Bloomchain.GuardianErrorHandler,
    module: Bloomchain.Auth.Guardian

  plug Guardian.Plug.VerifySession
  plug Guardian.Plug.LoadResource, allow_blank: true

end