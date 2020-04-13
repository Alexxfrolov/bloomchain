defmodule BloomchainWeb.SearchView do
  use BloomchainWeb, :view
  alias BloomchainWeb.SharedView

  def title("index.html", assigns),
    do: "Вы искали #{assigns[:query]} — Bloomchain"

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
end
