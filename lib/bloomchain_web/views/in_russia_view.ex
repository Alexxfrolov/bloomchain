defmodule BloomchainWeb.InRussiaView do
  use BloomchainWeb, :view

  alias BloomchainWeb.SharedView

  def title("index.html", _assigns),
    do: "Новости блокчейна и криптовалют в России - Bloomchain"

  def title("show.html", assigns), do: assigns[:article].title

  def meta("index.html", :description, _assigns),
    do:
      "Читайте эксклюзивные новости о блокчейне и криптовалютах в России. Аналитические статьи, исследования, комментарии экспертов на Блумчейн.ру."

  def meta("index.html", :keywords, _assigns), do: ""

  def meta("show.html", :description, assigns), do: assigns[:article].description

  def meta("show.html", :keywords, assigns), do: assigns[:article].keywords
end
