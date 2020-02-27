defmodule BloomchainWeb.Admin.Api.V1.TagView do
  use BloomchainWeb, :view

  def render("index.json", %{tags: tags}) do
    %{
      data: Enum.map(tags, &tag_json/1)
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
      created_at: tag.inserted_at,
      updated_at: tag.updated_at
    }
  end
end