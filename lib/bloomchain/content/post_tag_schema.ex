defmodule Bloomchain.Content.PostTag do
  import Ecto.Changeset

  alias Bloomchain.Content.{Tag, Post}

  use Ecto.Schema

  schema "posts_tags" do
    belongs_to(:tag, Tag, foreign_key: :tag_id)
    belongs_to(:post, Post, foreign_key: :post_id)
  end
end
