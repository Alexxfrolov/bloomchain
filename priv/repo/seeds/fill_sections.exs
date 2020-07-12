alias Bloomchain.Repo
alias Bloomchain.Content.Section

Repo.insert_all(Section, [
  %{
    name: "По умолчанию",
    slug: "default",
    inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    seo_settings: %{
      title:
        "Bloomchain — Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе",
      description:
        "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"
    }
  },
  %{
    name: "Коротко",
    slug: "newsfeed",
    inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    seo_settings: %{
      title: "Все новости о криптовалютах, блокчейне и финтехе",
      description:
        "Горячие новости мира криптовалют, блокчейн-технологий и финтеха. Последние новости и экспертные комментарии на портале Блумчейн.ру."
    }
  },
  %{
    name: "В деталях",
    slug: "detailed",
    inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    seo_settings: %{
      title: "Статьи о криптовалютах, блокчейне и финтехе",
      desctiption:
        "Аналитические статьи про криптовалюты, блокчейн и финтех. Подробные обзоры и комментарии экспертов на портале Блумчейн.ру."
    }
  },
  %{
    name: "Статистика",
    slug: "analysis",
    inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    seo_settings: %{
      title: "Биткоин к доллару | График BTC/USD | Анализ криптовалют | Статистика)",
      desctiption:
        "График биткоина к доллару (BTC/USD) на сегодня. Технический анализ криптовалют bitcoin, ethereum, ripple и других от специалистов рынка на портале Блумчейн.ру. Криптовалютная статистика, аналитика, мнения экспертов."
    }
  },
  %{
    name: "Что в России",
    slug: "in-russia",
    inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    seo_settings: %{
      title: "Новости блокчейна и криптовалют в России - Bloomchain",
      desctiption:
        "Читайте эксклюзивные новости о блокчейне и криптовалютах в России. Аналитические статьи, исследования, комментарии экспертов на Блумчейн.ру."
    }
  },
  %{
    name: "Персона",
    slug: "people",
    inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    seo_settings: %{
      title: "Люди из мира криптовалют, блокчейна и финтеха",
      desctiption:
        "Последние новости о людях из мира криптовалют, блокчейна и финтеха. Аналитические статьи, комментарии экспертов на сайте Блумчейн.ру."
    }
  },
  %{
    name: "События",
    slug: "calendar",
    inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    seo_settings: %{
      title: "Календарь событий в сфере блокчейна и криптовалют — Bloomchain",
      desctiption:
        "Календарь предстоящих событий в сфере криптовалют и блокчейна. Следите за ближайшими событиями в криптовалютном мире на Блумчейн.ру."
    }
  },
  %{
    name: "Исследования",
    slug: "research",
    inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    seo_settings: %{
      title: "Исследования — Bloomchain",
      desctiption:
        "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"
    }
  },
  %{
    name: "Исследования (Архив)",
    slug: "research-archive",
    inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
    seo_settings: %{
      title: "Исследования — Bloomchain",
      desctiption:
        "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"
    }
  }
])
