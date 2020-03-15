defmodule BloomchainWeb.CalendarView do
  use BloomchainWeb, :view

  alias BloomchainWeb.SharedView

  def title("index.html", _assigns),
    do: "Календарь событий в сфере блокчейна и криптовалют — Bloomchain"

  def title("show.html", assigns), do: assigns[:article].title

  def meta("index.html", :description, _assigns),
    do:
      "Календарь предстоящих событий в сфере криптовалют и блокчейна. Следите за ближайшими событиями в криптовалютном мире на Блумчейн.ру."

  def meta("index.html", :keywords, _assigns), do: ""

  def meta("show.html", :description, assigns), do: assigns[:article].description

  def meta("show.html", :keywords, assigns), do: assigns[:article].keywords
end
