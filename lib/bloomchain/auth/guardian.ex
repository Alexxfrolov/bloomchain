defmodule Bloomchain.Auth.Guardian do
  use Guardian, otp_app: :bloomchain

  alias Bloomchain.Auth.Account

  def subject_for_token(user, _claims) do
    sub = to_string(user.id)
    {:ok, sub}
  end

  def resource_from_claims(claims) do
    id = claims["sub"]
    user = Account.get_user(id)
    {:ok, user}
  end
end
