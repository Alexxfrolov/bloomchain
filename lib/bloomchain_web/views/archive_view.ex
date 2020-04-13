defmodule BloomchainWeb.ArchiveView do
  use BloomchainWeb, :view
  alias BloomchainWeb.Uploaders.File

  def title("index.html", _assigns),
    do: "Исследования — Bloomchain"

  def meta("index.html", :description, _assigns),
    do: "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"

  def meta("index.html", :keywords, _assigns), do: ""

  def meta("index.html", :og_url, _assigns), do: ""

  def meta("index.html", :og_type, _assigns), do: ""

  def meta("index.html", :og_title, _assigns), do: ""

  def meta("index.html", :og_description, _assigns), do: ""

  def meta("index.html", :og_image, _assigns), do: ""

  def meta("index.html", :og_image_width, _assigns), do: ""

  def meta("index.html", :og_image_height, _assigns), do: ""

  def archive_tag(item, conn: _conn) do
    content_tag(:p) do
      content_tag(:a, href: File.url({item.pdf.file, item.pdf}), target: "_blank") do
        img_tag(
          File.url({item.cover.file, item.cover}),
          class: "alignnone size-full wp-image-62815",
          alt: item.cover.alt
        )
      end
    end
  end
end
