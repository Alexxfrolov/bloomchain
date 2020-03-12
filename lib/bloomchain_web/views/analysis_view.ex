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
end
