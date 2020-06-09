alias Bloomchain.Repo
alias Bloomchain.Content.{User, Author}

"#{File.cwd!()}/priv/repo/seed/data_files/users.json"
|> File.read!()
|> Poison.decode!(keys: :atoms)
|> Enum.each(fn item ->
  Repo.insert!(
    User.changeset(%User{}, %{
      id: item.id,
      first_name: item.first_name,
      last_name: item.last_name,
      email: item.email,
      password: item.email
    })
  )

  Repo.insert!(
    Author.changeset(%Author{}, %{
      id: item.id,
      name: item.first_name <> " " <> item.last_name,
      user_id: item.id
    })
  )
end)

# update uniq primary id sequence after raw id insert
Ecto.Adapters.SQL.query!(Repo, "SELECT setval('users_id_seq', (SELECT MAX(id) from users))")
Ecto.Adapters.SQL.query!(Repo, "SELECT setval('authors_id_seq', (SELECT MAX(id) from authors))")

# Seed ADMIN acc
Repo.insert!(
  User.changeset(%User{}, %{
    first_name: "Admin",
    last_name: "Admin",
    email: "admin@app.com",
    password: "admin123",
    role: "admin"
  })
)
