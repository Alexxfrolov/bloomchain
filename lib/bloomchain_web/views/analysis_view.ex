defmodule BloomchainWeb.AnalysisView do
  use BloomchainWeb, :view

  alias BloomchainWeb.SharedView

  def title("index.html", _assigns),
    do: "Биткоин к доллару | График BTC/USD | Анализ криптовалют | Статистика"

  def title("show.html", assigns),
    do: assigns[:article].title

  def meta("index.html", :description, _assigns),
    do:
      "График биткоина к доллару (BTC/USD) на сегодня. Технический анализ криптовалют bitcoin, ethereum, ripple и других от специалистов рынка на портале Блумчейн.ру. Криптовалютная статистика, аналитика, мнения экспертов."

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
