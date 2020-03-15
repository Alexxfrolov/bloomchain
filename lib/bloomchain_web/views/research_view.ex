defmodule BloomchainWeb.ResearchView do
  use BloomchainWeb, :view

  alias BloomchainWeb.SharedView

  def title("index.html", _assigns),
    do: "Исследования — Bloomchain"

  def title("show.html", assigns), do: assigns[:article].title

  def meta("index.html", :description, _assigns),
    do: "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"

  def meta("index.html", :keywords, _assigns), do: ""

  def meta("show.html", :description, assigns), do: assigns[:article].description

  def meta("show.html", :keywords, assigns), do: assigns[:article].keywords
end
