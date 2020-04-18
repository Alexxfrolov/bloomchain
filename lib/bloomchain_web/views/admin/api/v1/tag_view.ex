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
      editable: false,
      # TO DO: check if any record in posts_tags to set correct deletable
      deletable: true,
      created_at: tag.inserted_at |> Timex.local(),
      updated_at: tag.updated_at |> Timex.local()
    }
  end
end
