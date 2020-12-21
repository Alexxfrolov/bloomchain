defmodule BloomchainWeb.Admin.Api.V1.TagView do
  use BloomchainWeb, :view

  def render("index.json", %{tags: tags, meta: meta}) do
    %{
      data: Enum.map(tags, &render("show.json", %{tag: &1})),
      meta: meta
    }
  end

  def render("show.json", %{tag: tag}) do
    tag_json(tag)
    |> Map.merge(%{
      editable: !(Ecto.assoc_loaded?(tag.post_ids) && Enum.any?(tag.post_ids)),
      deletable: !(Ecto.assoc_loaded?(tag.post_ids) && Enum.any?(tag.post_ids))
    })
  end

  def tag_json(tag) do
    %{
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      inserted_at: tag.inserted_at,
      updated_at: tag.updated_at
    }
  end
end
