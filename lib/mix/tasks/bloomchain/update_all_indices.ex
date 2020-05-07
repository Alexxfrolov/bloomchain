defmodule Mix.Tasks.Bloomchain.UpdateAllIndices do
  use Mix.Task

  @shortdoc "Обновляет стоимость монет и считает индекс"
  def run(_) do
    Mix.Task.run("bloomchain.update_coin_price")
    Mix.Task.run("bloomchain.update_index", [Bloomchain.Service.Index.Top10])
    Mix.Task.run("bloomchain.update_index", [Bloomchain.Service.Index.Bitcoin])
  end
end
