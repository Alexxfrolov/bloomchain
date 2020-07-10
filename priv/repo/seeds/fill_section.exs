alias Bloomchain.Repo
alias Bloomchain.Content.Section

Repo.insert_all(Section, [
  %{
    name: "Коротко",
    type: "newsfeed",
    inserted_at: Timex.now(),
    updated_at: Timex.now(),
    seo_settings: %{
      title: "Bloomchain: Коротко",
      description: ""
    }
  },
  %{
    name: "В деталях",
    type: "detailed",
    inserted_at: Timex.now(),
    updated_at: Timex.now(),
    seo_settings: %{
      title: "Bloomchain: В деталях",
      desctiption: ""
    }
  },
  %{
    name: "Статистика",
    type: "analisys",
    inserted_at: Timex.now(),
    updated_at: Timex.now(),
    seo_settings: %{
      title: "Биткоин к доллару | График BTC/USD | Анализ криптовалют | Статистика)",
      desctiption:
        "График биткоина к доллару (BTC/USD) на сегодня. Технический анализ криптовалют bitcoin, ethereum, ripple и других от специалистов рынка на портале Блумчейн.ру. Криптовалютная статистика, аналитика, мнения экспертов."
    }
  },
  %{
    name: "Что в России",
    type: "in-russia",
    inserted_at: Timex.now(),
    updated_at: Timex.now(),
    seo_settings: %{
      title: "Bloomchain: Что в России",
      desctiption: ""
    }
  },
  %{
    name: "Персона",
    type: "people",
    inserted_at: Timex.now(),
    updated_at: Timex.now(),
    seo_settings: %{
      title: "Bloomchain: Персона",
      desctiption: ""
    }
  },
  %{
    name: "События",
    type: "calendar",
    inserted_at: Timex.now(),
    updated_at: Timex.now(),
    seo_settings: %{
      title: "Календарь событий в сфере блокчейна и криптовалют — Bloomchain",
      desctiption:
        "Календарь предстоящих событий в сфере криптовалют и блокчейна. Следите за ближайшими событиями в криптовалютном мире на Блумчейн.ру."
    }
  },
  %{
    name: "Исследования",
    type: "research",
    inserted_at: Timex.now(),
    updated_at: Timex.now(),
    seo_settings: %{
      title: "Исследования — Bloomchain",
      desctiption:
        "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"
    }
  },
  %{
    name: "Исследования (Архив)",
    type: "research-archive",
    inserted_at: Timex.now(),
    updated_at: Timex.now(),
    seo_settings: %{
      title: "Исследования — Bloomchain",
      desctiption:
        "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"
    }
  }
])
