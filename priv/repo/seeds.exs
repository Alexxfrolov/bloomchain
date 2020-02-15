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
  %{name: "криптовалюта", inserted_at: Timex.now(), updated_at: Timex.now()},
  %{name: "рынок", inserted_at: Timex.now(), updated_at: Timex.now()},
  %{name: "биткоин", inserted_at: Timex.now(), updated_at: Timex.now()}
])

for type <- ~w[newsfeed detailed analysis people in_russia research people] do
  for i <- 1..6, i > 0 do
    title = "Тестовое название #{i} для раздела #{type}"

    Article.create(
      %{
        title: title,
        lead: title,
        type: type,
        body: File.read!("#{File.cwd!()}/priv/repo/data_files/newsfeed.html"),
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
