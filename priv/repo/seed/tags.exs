alias Bloomchain.Repo
alias Bloomchain.Content.{Tag}

data =
  "#{File.cwd!()}/priv/repo/seed/data_files/tags.json"
  |> File.read!()
  |> Poison.decode!(keys: :atoms)

Repo.insert_all(Tag, data)

# update uniq primary id sequence after raw id insert
Ecto.Adapters.SQL.query!(Repo, "SELECT setval('tags_id_seq', (SELECT MAX(id) from tags))")
