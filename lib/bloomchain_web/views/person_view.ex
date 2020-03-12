defmodule BloomchainWeb.PersonView do
  use BloomchainWeb, :view

  alias BloomchainWeb.SharedView

  def title("index.html", _assigns),
    do: "Люди из мира криптовалют, блокчейна и финтеха"

  def meta("index.html", :description, _assigns),
    do:
      "Последние новости о людях из мира криптовалют, блокчейна и финтеха. Аналитические статьи, комментарии экспертов на сайте Блумчейн.ру."

  def meta("index.html", :keywords, _assigns), do: ""

  def title("show.html", assigns), do: assigns[:article].title

  def meta("show.html", :description, assigns), do: assigns[:article].description

  def meta("show.html", :keywords, assigns), do: assigns[:article].keywords
end
