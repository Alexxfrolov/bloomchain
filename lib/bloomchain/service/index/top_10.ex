defmodule Bloomchain.Service.Index.Top10 do
  alias Bloomchain.Content.{Coin, CoinPrice, Index}

  def call do
    timestamp = Timex.now() |> Timex.to_unix()

    request_data()
    |> calculate_index
    |> response(timestamp)
  end

  defp request_data() do
    timestamp = Timex.now() |> Timex.to_unix()

    url =
      Application.get_env(:bloomchain, :coinmarket)[:url] <> "/v1/global-metrics/quotes/latest"

    headers = [
      "X-CMC_PRO_API_KEY": Application.get_env(:bloomchain, :coinmarket)[:api_key],
      Accept: "application/json"
    ]

    params = [convert: "USD"]

    with {:ok, %{status_code: 200, body: body}} <- HTTPoison.get(url, headers, params) do
      {:ok,
       %{
         total_market_cap: Poison.decode!(body) |> get_in(~w(data quote USD total_market_cap))
       }}
    else
      {:error, _} -> {:error, %{message: "Service Unavailable", time: timestamp, type: "bitcoin"}}
    end
  end

  defp calculate_index({:ok, %{total_market_cap: total_market_cap}}) do
    value =
      (previous_index(Index.last("top_10")) *
         (1 + Enum.sum(current_coin_indices(total_market_cap))))
      |> abs
      |> Float.ceil(2)

    {:ok, value}
  end

  defp calculate_index({:error, _} = error), do: error

  defp current_coin_indices(total_market_cap) do
    Coin.top_10()
    |> Enum.map(fn coin ->
      current = CoinPrice.current(coin)
      previous = CoinPrice.previous(coin)

      (current.market_cap * (current.price - previous.price) / previous.price * total_market_cap)
      |> Float.ceil(2)
    end)
  end

  defp previous_index(nil) do
    100
  end

  defp previous_index(index) do
    index.value
  end

  defp response({:ok, value}, time) do
    {:ok, %{value: value, time: time, type: "top_10"}}
  end

  defp response({:error, _} = error, _), do: error
end
