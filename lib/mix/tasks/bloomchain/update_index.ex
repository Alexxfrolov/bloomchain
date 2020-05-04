defmodule Mix.Tasks.Bloomchain.UpdateIndex do
  use Mix.Task

  alias Bloomchain.Repo
  alias Bloomchain.Content.Index

  @shortdoc "Индекс Блумчейн для графиков"
  def run([module_name]) do
    # start the Repo for interacting with data
    Mix.Task.run("app.start")

    module = Module.concat(Elixir, module_name)

    module.call()
    |> insert_value
  end

  defp insert_value({:ok, data}) do
    Repo.insert!(Index.changeset(%Index{}, data))

    {:ok, data}
  end

  defp insert_value({:error, %{type: type, time: time, message: msg}}) do
    %{value: value} = Index.last(type)
    Repo.insert!(Index.changeset(%Index{}, %{type: type, time: time, value: value}))

    IO.puts(msg)
    {:error, msg}
  end
end
