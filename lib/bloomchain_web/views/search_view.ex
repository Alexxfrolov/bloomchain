defmodule BloomchainWeb.SearchView do
  use BloomchainWeb, :view

  alias BloomchainWeb.SharedView

  def title("index.html", assigns),
    do: "Вы искали #{assigns[:query]} — Bloomchain"

  def meta("index.html", :description, _assigns),
    do: "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"

  def meta("index.html", :keywords, _assigns), do: ""
end
