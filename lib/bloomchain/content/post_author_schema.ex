defmodule Bloomchain.Content.PostAuthor do
  use Ecto.Schema
  alias Bloomchain.Content.{Author, Post}

  schema "posts_authors" do
    belongs_to(:tag, Author, foreign_key: :author_id)
    belongs_to(:post, Post, foreign_key: :post_id)
  end
end
