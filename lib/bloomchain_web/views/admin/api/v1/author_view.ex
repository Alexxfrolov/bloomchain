defmodule BloomchainWeb.Admin.Api.V1.AuthorView do
  use BloomchainWeb, :view

  def render("index.json", %{authors: authors, meta: meta}) do
    %{
      data: Enum.map(authors, &author_json/1),
      meta: meta
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
      deletable: !(Ecto.assoc_loaded?(author.post_ids) && Enum.any?(author.post_ids)),
      inserted_at: author.inserted_at |> Timex.local(),
      updated_at: author.updated_at |> Timex.local()
    }
  end

  def author_json(author) do
    %{
      id: author.id,
      name: author.name,
      editable: false,
      deletable: false,
      inserted_at: author.inserted_at |> Timex.local(),
      updated_at: author.updated_at |> Timex.local()
    }
  end
end
