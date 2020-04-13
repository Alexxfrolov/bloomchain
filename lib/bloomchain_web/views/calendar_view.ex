defmodule BloomchainWeb.CalendarView do
  use BloomchainWeb, :view

  alias BloomchainWeb.SharedView

  def title("index.html", _assigns),
    do: "Календарь событий в сфере блокчейна и криптовалют — Bloomchain"

  def title("show.html", assigns), do: assigns[:article].title

  def meta("index.html", :description, _assigns),
    do:
      "Календарь предстоящих событий в сфере криптовалют и блокчейна. Следите за ближайшими событиями в криптовалютном мире на Блумчейн.ру."

  def meta("show.html", :description, assigns), do: assigns[:article].description

  def meta("index.html", :keywords, _assigns), do: ""

  def meta("show.html", :keywords, assigns), do: assigns[:article].keywords

  def meta("index.html", :og_url, _assigns), do: ""

  def meta("show.html", :og_url, assigns), do: ""

  def meta("index.html", :og_type, _assigns), do: ""

  def meta("show.html", :og_type, assigns), do: ""

  def meta("index.html", :og_title, _assigns), do: ""

  def meta("show.html", :og_title, assigns), do: ""

  def meta("index.html", :og_description, _assigns), do: ""

  def meta("show.html", :og_description, assigns), do: ""

  def meta("index.html", :og_image, _assigns), do: ""

  def meta("show.html", :og_image, assigns), do: ""

  def meta("index.html", :og_image_width, _assigns), do: ""

  def meta("show.html", :og_image_width, assigns), do: ""

  def meta("index.html", :og_image_height, _assigns), do: ""

  def meta("show.html", :og_image_height, assigns), do: ""
end
