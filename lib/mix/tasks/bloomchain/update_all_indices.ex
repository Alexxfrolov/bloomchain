defmodule Mix.Tasks.Bloomchain.UpdateAllIndices do
  use Mix.Task

  @shortdoc "Обновляет все индексы за раз"
  def run(_) do
    Mix.Task.run("bloomchain.update_coin_price")
    Mix.Task.run("bloomchain.update_index", [Bloomchain.Service.Index.Top10])
    Mix.Task.rerun("bloomchain.update_index", [Bloomchain.Service.Index.Bitcoin])
  end
end
