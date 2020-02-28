defmodule BloomchainWeb.Admin.Api.V1.MediaView do
  use BloomchainWeb, :view
  alias BloomchainWeb.Uploaders.File

  def render("index.json", %{media: media}) do
    %{
      data: Enum.map(media, &media_json/1)
    }
  end

  def render("show.json", %{media: media}) do
    media_json(media)
  end

  def media_json(nil) do
    nil
  end

  def media_json(media) do
    %{
      id: media.id,
      type: media.type,
      alt: media.alt,
      title: media.title,
      link: File.url({media.file, media}, :original),
      created_at: media.inserted_at,
      updated_at: media.updated_at
    }
  end
end
