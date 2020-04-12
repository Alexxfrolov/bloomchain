defmodule BloomchainWeb.TagView do
  use BloomchainWeb, :view
  alias BloomchainWeb.SharedView

  def title("show.html", assigns),
    do: "#{assigns[:tag]} — Bloomchain"

  def meta("show.html", :description, _assigns),
    do: "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"

  def meta("show.html", :keywords, _assigns), do: ""
end
