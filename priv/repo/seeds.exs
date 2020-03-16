alias Bloomchain.Repo

alias Bloomchain.Content.{Article, Tag, User, Subscriber, Media, Archive, Author, Index}

# Seed Indices
first = Timex.shift(Timex.now(), days: -2) |> Timex.to_unix()
last = Timex.now() |> Timex.to_unix()
# 15 minutes
step = 900

for time <- :lists.seq(first, last, step), time > 0 do
  Repo.insert!(Index.changeset(%Index{}, %{value: 5400, type: "bitcoin", time: time}))

  Repo.insert!(Index.changeset(%Index{}, %{value: 160, type: "top_10", time: time}))
end

# # Seed Archive
# for i <- 1..4, i > 0 do
#   path = "#{File.cwd!()}/priv/repo/data_files/archive/"
#
#   cover =
#     Repo.insert!(
#       Media.changeset(%Media{}, %{
#         type: "image",
#         file: %Plug.Upload{
#           content_type: "image/jpeg",
#           filename: "#{i}.png",
#           path: "#{path}/#{i}.png"
#         }
#       })
#     )
#
#   pdf =
#     Repo.insert!(
#       Media.changeset(%Media{}, %{
#         type: "pdf",
#         file: %Plug.Upload{
#           content_type: "application/pdf",
#           filename: "#{i}.pdf",
#           path: "#{path}/#{i}.pdf"
#         }
#       })
#     )
#
#   Repo.insert!(Archive.changeset(%Archive{}, %{cover_id: cover.id, pdf_id: pdf.id}))
# end
#
# # Seed Users
# Repo.insert!(
#   User.changeset(%User{}, %{
#     first_name: "Алексей",
#     last_name: "Фролов",
#     email: "admin@app.com",
#     password: "admin123",
#     role: "admin"
#   })
# )
#
# Repo.insert!(
#   User.changeset(%User{}, %{
#     first_name: "Александр",
#     last_name: "Моисеенко",
#     email: "admin2@app.com",
#     password: "admin123",
#     role: "admin"
#   })
# )
#
# # Seed Authors
# Repo.insert_all(Author, [
#   %{
#     name: "Bloomchain Research",
#     inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
#     updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
#   },
#   %{
#     user_id: 1,
#     name: "Фролов Алексей",
#     inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
#     updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
#   },
#   %{
#     user_id: 2,
#     name: "Моисеенко Александр",
#     inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
#     updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
#   }
# ])
#
# # Seed Subscribers
# Repo.insert_all(Subscriber, [
#   %{
#     email: "app@yandex.ru",
#     inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
#     updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
#   },
#   %{
#     email: "new@yandex.ru",
#     inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
#     updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
#   },
#   %{
#     email: "superemail@google.com",
#     inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
#     updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
#   }
# ])
#
# # Seed Tags
# Repo.insert_all(Tag, [
#   %{
#     name: "криптовалюта",
#     slug: "kripto",
#     inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
#     updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
#   },
#   %{
#     name: "рынок",
#     slug: "rinok",
#     inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
#     updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
#   },
#   %{
#     name: "биткоин",
#     slug: "bitcoin",
#     inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
#     updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
#   }
# ])
#
# # Seed Posts
# cover =
#   Repo.insert!(
#     Media.changeset(%Media{}, %{
#       alt: "test image",
#       type: "image",
#       file: %Plug.Upload{
#         content_type: "image/jpeg",
#         filename: "cover.png",
#         path: "#{File.cwd!()}/priv/repo/data_files/img-bitcoin.jpg"
#       }
#     })
#   )
#
# for type <- ~w[newsfeed detailed research analysis in_russia calendar person] do
#   for i <- 1..15, i > 0 do
#     title = "Тестовое название #{i} для раздела #{type}"
#
#     Article.create(%{
#       title: title,
#       lead:
#         "Рынок криптовалют продолжает оставаться очень техничным. Мы говорили о возможном преодолении падающего тренда.",
#       type: type,
#       description: "Тестовое описание",
#       keywords: ["asdf", "test"],
#       body: File.read!("#{File.cwd!()}/priv/repo/data_files/newsfeed.html"),
#       status: "published",
#       published_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
#       author: "Frolov Aleksey",
#       time: i + 10,
#       cover_id: cover.id,
#       tags: [1, 2, 3],
#       authors: [1]
#     })
#   end
# end
