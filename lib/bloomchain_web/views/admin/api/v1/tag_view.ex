defmodule BloomchainWeb.Admin.Api.V1.TagView do
  use BloomchainWeb, :view

  def render("index.json", %{tags: tags, meta: meta}) do
    %{
      data: Enum.map(tags, &tag_json/1),
      meta: meta
    }
  end

  def render("show.json", %{tag: tag}) do
    tag_json(tag)
  end

  def tag_json(tag) do
    %{
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      editable: !(Ecto.assoc_loaded?(tag.post_ids) && Enum.any?(tag.post_ids)),
      deletable: !(Ecto.assoc_loaded?(tag.post_ids) && Enum.any?(tag.post_ids)),
      inserted_at: tag.inserted_at |> Timex.local(),
      updated_at: tag.updated_at |> Timex.local()
    }
  end
end
