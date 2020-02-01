defmodule BloomchainWeb.Auth.UserTest do
  import Bloomchain.Factory.User

  use ExUnit.Case
  use Bloomchain.DataCase

  alias Bloomchain.Auth.User

  describe "User Schema" do
    test "valid changeset" do
      %{valid?: valid} = User.create_changeset(%User{}, valid_attrs())
      assert valid
    end

    test "invalid changeset" do
      Enum.each(invalid_attrs(), fn attr ->
        %{valid?: valid} = User.create_changeset(%User{}, attr)
        assert valid === false
      end)
    end
  end
end
