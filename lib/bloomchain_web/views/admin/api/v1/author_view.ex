defmodule BloomchainWeb.Admin.Api.V1.AuthorView do
  use BloomchainWeb, :view

  alias Bloomchain.Content.User

  def render("index.json", %{authors: authors}) do
    %{
      data: Enum.map(authors, &author_json/1)
    }
  end

  def render("show.json", %{author: author}) do
    author_json(author)
  end

  def author_json(%{user_id: nil} = author) do
    %{
      id: author.id,
      name: author.name,
      editable: true,
      created_at: author.inserted_at,
      updated_at: author.updated_at
    }
  end

  def author_json(author) do
    %{
      id: author.id,
      name: author.name,
      editable: false,
      created_at: author.inserted_at,
      updated_at: author.updated_at
    }
  end
end
