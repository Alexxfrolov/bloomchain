defmodule Bloomchain.Content.PostTag do
  use Ecto.Schema
  alias Bloomchain.Content.{Tag, Post}

  schema "posts_tags" do
    belongs_to(:tag, Tag, foreign_key: :tag_id)
    belongs_to(:post, Post, foreign_key: :post_id)
  end
end
