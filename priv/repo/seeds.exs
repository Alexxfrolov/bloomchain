alias Bloomchain.Repo

alias Bloomchain.Auth.User
alias Bloomchain.Content.{Article, Tag}

user =
  Repo.insert!(
    User.create_changeset(%User{}, %{
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

for type <- ~w[newsfeed detailed analysis in_russia calendar person] do
  for i <- 1..6, i > 0 do
    title = "Тестовое название #{i} для раздела #{type}"

    Article.create(
      %{
        title: title,
        lead:
          "Рынок криптовалют продолжает оставаться очень техничным. Мы говорили о возможном преодолении падающего тренда.",
        type: type,
        body: File.read!("#{File.cwd!()}/priv/repo/data_files/newsfeed.html"),
        status: "published",
        time: i + 10,
        cover: %Plug.Upload{
          content_type: "image/png",
          filename: "cover_#{type}_#{i}.png",
          path: "#{File.cwd!()}/priv/repo/data_files/img-bitcoin.jpg"
        }
      },
      user,
      Repo.all(Tag)
    )
  end
end
