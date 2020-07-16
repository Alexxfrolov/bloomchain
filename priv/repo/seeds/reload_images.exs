import Ecto.Query
alias Bloomchain.{Repo, Content.Media}

convert_images = fn item ->
  try do
    url = BloomchainWeb.Uploaders.File.url({item.file, item})

    %HTTPoison.Response{body: body} = HTTPoison.get!(url)

    file_path = "/tmp/#{item.uuid}.#{Path.extname(item.file.file_name)}"
    File.write!(file_path, body)

    Media.changeset(item, %{
      file: %Plug.Upload{
        path: file_path,
        content_type: item.content_type,
        filename: item.file.file_name
      },
      reloaded: true
    })
    |> Repo.update!()

    File.rm(file_path)
    nil
  rescue
    e ->
      IO.puts("An error occurred with - #{item.id} ")
      item.id
  end
end

result =
  from(
    m in Media,
    where: m.reloaded == false
  )
  |> Repo.all()
  |> Task.async_stream(&convert_images.(&1),
    timeout: 15_000,
    on_timeout: :kill_task,
    ordered: false
  )
  |> Enum.to_list()
  |> Enum.reject(&is_nil/1)

IO.puts(result)
