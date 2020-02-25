alias Bloomchain.Repo

alias Bloomchain.Content.{Article, Tag, User}

Repo.insert!(
  User.changeset(%User{}, %{
    name: "Admin",
    email: "admin@app.com",
    password: "admin123",
    role: "admin"
  })
)

Repo.insert_all(Tag, [
  %{name: "криптовалюта", slug: "kripto", inserted_at: Timex.now(), updated_at: Timex.now()},
  %{name: "рынок", slug: "rinok", inserted_at: Timex.now(), updated_at: Timex.now()},
  %{name: "биткоин", slug: "bitcoin", inserted_at: Timex.now(), updated_at: Timex.now()}
])

for type <- ~w[newsfeed detailed research analysis in_russia calendar person] do
  for i <- 1..6, i > 0 do
    title = "Тестовое название #{i} для раздела #{type}"

    Article.create(
      %{
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
        cover: %Plug.Upload{
          content_type: "image/png",
          filename: "cover_#{type}_#{i}.png",
          path: "#{File.cwd!()}/priv/repo/data_files/img-bitcoin.jpg"
        }
      },
      [1, 2, 3]
    )
  end
end
