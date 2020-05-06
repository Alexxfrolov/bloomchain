defmodule Mix.Tasks.Bloomchain.UpdateIndexTop10 do
  use Mix.Task

  @shortdoc "Обновляет стоимость монет и считает индекс"
  def run(_) do
    # start the Repo for interacting with data
    Mix.Task.run("bloomchain.update_coin_price")
    Mix.Task.run("bloomchain.update_index", [Bloomchain.Service.Index.Top10])
  end
end
