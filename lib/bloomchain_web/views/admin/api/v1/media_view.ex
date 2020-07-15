defmodule BloomchainWeb.Admin.Api.V1.MediaView do
  use BloomchainWeb, :view
  alias Bloomchain.Content.Media
  alias BloomchainWeb.Uploaders.File

  def render("index.json", %{media: media, meta: meta}) do
    %{
      data: Enum.map(media, &media_json/1),
      meta: meta
    }
  end

  def render("editor.json", %{media: media}) do
    Enum.map(media, &editor_media_json/1)
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
      source: media.source,
      url: File.url({media.file, media}, :original),
      srcset: Media.srcset(media),
      inserted_at: media.inserted_at |> Timex.local(),
      updated_at: media.updated_at |> Timex.local()
    }
  end

  def editor_media_json(media) do
    %{
      url: File.url({media.file, media}, :original),
      srcset: Media.srcset(media)
    }
  end

  defp do_srcset(media) do
    %{
      "800px" =>
        [
          File.url({media.file, media}, :desktop),
          File.url({media.file, media}, :desktop_2x) <> " 2x"
        ]
        |> Enum.join(", "),
      "540px" =>
        [
          File.url({media.file, media}, :tablet),
          File.url({media.file, media}, :tablet_2x) <> " 2x"
        ]
        |> Enum.join(", "),
      "320px" =>
        [
          File.url({media.file, media}, :mobile),
          File.url({media.file, media}, :mobile_2x) <> " 2x"
        ]
        |> Enum.join(", ")
    }
  end
end
