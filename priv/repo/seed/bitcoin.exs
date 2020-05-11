alias Bloomchain.Repo
alias Bloomchain.Content.{Index}

"#{File.cwd!()}/priv/repo/data_files/bitcoin.json"
|> File.read!()
|> Poison.decode!(keys: :atoms)
|> Enum.map(fn item ->
  {:ok, value} = Ecto.Type.cast(:float, item.value)

  %{
    time: item.time,
    value: value,
    type: item.type
  }
end)
|> Enum.chunk_every(1000)
|> Enum.each(fn batch ->
  Repo.insert_all(Index, batch)
end)
