defmodule Bloomchain.Content.PostAuthor do
  import Ecto.Changeset

  alias Bloomchain.Content.{Author, Post}

  use Ecto.Schema

  schema "posts_authors" do
    belongs_to(:tag, Author, foreign_key: :author_id)
    belongs_to(:post, Post, foreign_key: :post_id)
  end
end
