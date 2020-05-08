alias Bloomchain.Repo
alias Bloomchain.Content.{User, Author}

"#{File.cwd!()}/priv/repo/data_files/users.json"
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
