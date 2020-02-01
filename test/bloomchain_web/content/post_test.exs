defmodule BloomchainWeb.Content.PostTest do
  import Bloomchain.Factory.Post

  use ExUnit.Case
  use Bloomchain.DataCase

  alias Bloomchain.Content.Post

  describe "Post Schema" do
    test "valid changeset" do
      %{valid?: valid} = Post.create_changeset(%Post{}, valid_attrs())
      assert valid
    end

    test "invalid changeset" do
      Enum.each(invalid_attrs(), fn attr ->
        %{valid?: valid} = Post.create_changeset(%Post{}, attr)
        assert valid === false
      end)
    end
  end
end
