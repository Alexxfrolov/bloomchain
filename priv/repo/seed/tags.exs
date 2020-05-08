alias Bloomchain.Repo
alias Bloomchain.Content.{Tag}

data =
  "#{File.cwd!()}/priv/repo/data_files/tags.json"
  |> File.read!()
  |> Poison.decode!(keys: :atoms)

Repo.insert_all(Tag, data)
