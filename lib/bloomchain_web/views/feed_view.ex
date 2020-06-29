defmodule BloomchainWeb.FeedView do
  use BloomchainWeb, :view

  import Phoenix.Controller, only: [current_url: 1]

  alias Bloomchain.{Repo, Content.Post, Content.Artcile}

  def format_date(datetime) do
    Timex.format!(Timex.to_datetime(datetime, "UTC"), "{RFC1123}")
  end

  def parse_markdown(markdown), do: Phoenix.HTML.raw(markdown) |> elem(1)

  def title(type) do
    # будут перенесено в БД при доработке - редактирование разделов
    %{
      "newsfeed" => "Bloomchain: Коротко",
      "detailed" => "Bloomchain: В деталях",
      "in-russia" => "Bloomchain: Что в России",
      "people" => "Bloomchain: Персона",
      "analysis" => "Bloomchain: Статистика",
      "calendar" => "Bloomchain: События",
      "research" => "Bloomchain: Исследования"
    }
    |> Map.get(type, "Bloomchain")
  end

  def description(type) do
    # будут перенесено в БД при доработке - редактирование разделов
    %{
      "newsfeed" =>
        "Горячие новости мира криптовалют, блокчейн-технологий и финтеха. Последние новости и экспертные комментарии на портале Блумчейн.ру.",
      "detailed" =>
        "налитические статьи про криптовалюты, блокчейн и финтех. Подробные обзоры и комментарии экспертов на портале Блумчейн.ру.",
      "in-russia" =>
        "Читайте эксклюзивные новости о блокчейне и криптовалютах в России. Аналитические статьи, исследования, комментарии экспертов на Блумчейн.ру.",
      "people" =>
        "Последние новости о людях из мира криптовалют, блокчейна и финтеха. Аналитические статьи, комментарии экспертов на сайте Блумчейн.ру.",
      "analysis" =>
        "График биткоина к доллару (BTC/USD) на сегодня. Технический анализ криптовалют bitcoin, ethereum, ripple и других от специалистов рынка на портале Блумчейн.ру. Криптовалютная статистика, аналитика, мнения экспертов.",
      "calendar" =>
        "Календарь предстоящих событий в сфере криптовалют и блокчейна. Следите за ближайшими событиями в криптовалютном мире на Блумчейн.ру.",
      "research" =>
        "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"
    }
    |> Map.get(
      type,
      "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"
    )
  end

  def post_description(item) do
    (item.lead || first_paragraph(item.body))
    |> parse_markdown
  end

  def guid(item), do: "bloomchain_posts_#{item.type}_#{item.id}"

  defp first_paragraph(body) do
    a =
      Regex.run(~r/(?<=<p>)(.*?)(?=<\/p>)/, body, capture: :first)
      |> List.first()
      |> Floki.text()
  end
end
