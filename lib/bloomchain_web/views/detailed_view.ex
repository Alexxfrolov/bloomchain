defmodule BloomchainWeb.DetailedView do
  use BloomchainWeb, :view

  alias BloomchainWeb.SharedView

  def title("index.html", _assigns),
    do: "Статьи о криптовалютах, блокчейне и финтехе"

  def title("show.html", assigns), do: assigns[:article].title

  def meta("index.html", :description, _assigns),
    do:
      "Аналитические статьи про криптовалюты, блокчейн и финтех. Подробные обзоры и комментарии экспертов на портале Блумчейн.ру."

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
