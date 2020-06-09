alias Bloomchain.Repo
alias Bloomchain.Content.{Subscriber}

data =
  "#{File.cwd!()}/priv/repo/seed/data_files/subscribers.json"
  |> File.read!()
  |> Poison.decode!(keys: :atoms)
  |> Enum.map(fn item ->
    %{
      email: item.email,
      inserted_at: NaiveDateTime.from_iso8601!(item.inserted_at)
    }
  end)

Repo.insert_all(Subscriber, data)
