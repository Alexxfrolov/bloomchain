defmodule BloomchainWeb.DetailedView do
  use BloomchainWeb, :view

  alias BloomchainWeb.SharedView

  def title("index.html", _assigns),
    do: "Статьи о криптовалютах, блокчейне и финтехе"

  def title("show.html", assigns), do: assigns[:article].title

  def meta("index.html", :description, _assigns),
    do:
      "Аналитические статьи про криптовалюты, блокчейн и финтех. Подробные обзоры и комментарии экспертов на портале Блумчейн.ру."

  def meta("index.html", :keywords, _assigns), do: ""

  def meta("show.html", :description, assigns), do: assigns[:article].description

  def meta("show.html", :keywords, assigns), do: assigns[:article].keywords
end
