defmodule BloomchainWeb.ArchiveView do
  use BloomchainWeb, :view
  alias BloomchainWeb.Uploaders.File

  def archive_tag(item, conn: _conn) do
    content_tag(:p) do
      content_tag(:a, href: File.url({item.pdf.file, item.pdf})) do
        img_tag(
          File.url({item.cover.file, item.cover}),
          class: "alignnone size-full wp-image-62815",
          alt: item.cover.alt
        )
      end
    end
  end
end
