defmodule Mix.Tasks.Bloomchain.UpdateCoinPrice do
  use Mix.Task

  alias Bloomchain.Repo
  alias Bloomchain.Content.{Coin, CoinPrice}
  alias Bloomchain.Service.CoinPrice, as: Service

  @shortdoc "Обновляет цену монет"
  def run(_) do
    # start the Repo for interacting with data
    Mix.Task.run("app.start")

    Service.call()
    |> insert_value
  end

  defp insert_value({:ok, data}) do
    data
    |> Enum.each(fn item ->
      update_coin(item[:coin])
      insert_price(item[:price])
    end)
  end

  defp insert_value({:error, error}), do: {:error, error}

  defp update_coin(params) do
    if coin = Repo.get(Coin, params[:id]) do
      coin |> Coin.changeset(params) |> Repo.update!()
    else
      Coin.changeset(%Coin{}, params) |> Repo.insert!()
    end
  end

  defp insert_price(params) do
    CoinPrice.changeset(%CoinPrice{}, params) |> Repo.insert!()
  end
end
