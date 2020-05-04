defmodule Bloomchain.Content.UserTest do
  import Bloomchain.Factory.User

  use ExUnit.Case
  use Bloomchain.DataCase

  alias Bloomchain.Content.User

  describe "User Schema" do
    test "valid changeset" do
      %{valid?: valid} = User.changeset(%User{}, valid_attrs())
      assert valid
    end

    test "invalid changeset" do
      Enum.each(invalid_attrs(), fn attr ->
        %{valid?: valid} = User.changeset(%User{}, attr)
        assert valid === false
      end)
    end
  end
end
