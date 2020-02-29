alias Bloomchain.Repo

alias Bloomchain.Content.{Article, Tag, User, Subscriber, Media, Archive}

cover =
  Repo.insert!(
    Media.create_changeset(%Media{}, %{
      alt: "test image",
      type: "image",
      file: %Plug.Upload{
        content_type: "image/jpeg",
        filename: "cover.png",
        path: "#{File.cwd!()}/priv/repo/data_files/img-bitcoin.jpg"
      }
    })
  )

for i <- 1..5, i > 0 do
  path = "#{File.cwd!()}/priv/repo/data_files/archive/"

  cover =
    Repo.insert!(
      Media.create_changeset(%Media{}, %{
        type: "image",
        file: %Plug.Upload{
          content_type: "image/jpeg",
          filename: "#{i}.png",
          path: "#{path}/#{i}.png"
        }
      })
    )

  pdf =
    Repo.insert!(
      Media.create_changeset(%Media{}, %{
        type: "pdf",
        file: %Plug.Upload{
          content_type: "application/pdf",
          filename: "#{i}.pdf",
          path: "#{path}/#{i}.pdf"
        }
      })
    )

  Repo.insert!(Archive.create_changeset(%Archive{}, %{cover_id: cover.id, pdf_id: pdf.id}))
end

Repo.insert!(
  User.create_changeset(%User{}, %{
    name: "Admin",
    email: "admin@app.com",
    password: "admin123",
    role: "admin"
  })
)

Repo.insert_all(Subscriber, [
  %{email: "app@yandex.ru", inserted_at: Timex.now(), updated_at: Timex.now()},
  %{email: "new@yandex.ru", inserted_at: Timex.now(), updated_at: Timex.now()},
  %{email: "superemail@google.com", inserted_at: Timex.now(), updated_at: Timex.now()}
])

Repo.insert_all(Tag, [
  %{name: "криптовалюта", slug: "kripto", inserted_at: Timex.now(), updated_at: Timex.now()},
  %{name: "рынок", slug: "rinok", inserted_at: Timex.now(), updated_at: Timex.now()},
  %{name: "биткоин", slug: "bitcoin", inserted_at: Timex.now(), updated_at: Timex.now()}
])

for type <- ~w[newsfeed detailed research analysis in_russia calendar person] do
  for i <- 1..6, i > 0 do
    title = "Тестовое название #{i} для раздела #{type}"

    Article.create(%{
      title: title,
      lead:
        "Рынок криптовалют продолжает оставаться очень техничным. Мы говорили о возможном преодолении падающего тренда.",
      type: type,
      description: "Тестовое описание",
      keywords: ["asdf", "test"],
      body: File.read!("#{File.cwd!()}/priv/repo/data_files/newsfeed.html"),
      status: "published",
      author: "Frolov Aleksey",
      time: i + 10,
      cover_id: cover.id,
      tags: [1, 2, 3]
    })
  end
end
