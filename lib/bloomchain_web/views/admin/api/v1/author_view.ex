defmodule BloomchainWeb.Admin.Api.V1.AuthorView do
  use BloomchainWeb, :view

  def render("index.json", %{authors: authors, meta: meta}) do
    %{
      data: Enum.map(authors, &render("show.json", %{author: &1})),
      meta: meta
    }
  end

  def render("show.json", %{author: author}) do
    author_json(author)
    |> Map.merge(%{
      editable: author.user_id == nil,
      deletable:
        author.user_id == nil &&
          !(Ecto.assoc_loaded?(author.post_ids) && Enum.any?(author.post_ids))
    })
  end

  def author_json(author) do
    %{
      id: author.id,
      name: author.name,
      inserted_at: author.inserted_at,
      updated_at: author.updated_at
    }
  end
end
