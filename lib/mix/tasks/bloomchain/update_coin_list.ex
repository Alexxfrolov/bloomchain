defmodule Mix.Tasks.Bloomchain.UpdateCoinList do
  use Mix.Task

  alias Bloomchain.Repo
  alias Bloomchain.Content.Coin
  alias Bloomchain.Service.CoinList, as: Service

  @shortdoc "Обновляет список всех монет"
  def run(_) do
    # start the Repo for interacting with data
    Mix.Task.run("app.start")

    Service.call()
    |> get_diff
    |> insert_value
  end

  defp get_diff({:ok, data}) do
    current_ids = Coin.all_ids()

    new_data =
      data
      |> Enum.reject(&Enum.member?(current_ids, &1[:id]))

    {:ok, new_data}
  end

  defp get_diff({:error, error}), do: {:error, error}

  defp insert_value({:ok, data}) do
    Repo.insert_all(Coin, data)
  end

  defp insert_value({:error, error}), do: {:error, error}
end
