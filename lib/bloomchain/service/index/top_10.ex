defmodule Bloomchain.Service.Index.Top10 do
  alias Bloomchain.Content.{Coin, CoinPrice, Index}

  def call do
    timestamp = Timex.now() |> Timex.to_unix()

    request_data()
    |> calculate_index
    |> response(timestamp)
  end

  defp request_data() do
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
      {:error, _} -> {:error, %{message: "Service Unavailable"}}
    end
  end

  defp calculate_index({:ok, %{total_market_cap: total_market_cap}}) do
    value =
      previous_index(Index.last("top_10")) *
        (1 + Enum.sum(current_coin_indices(total_market_cap)))

    {:ok, value}
  end

  defp calculate_index({:error, _} = error), do: error

  defp current_coin_indices(total_market_cap) do
    Coin.top_10()
    |> Enum.map(fn coin ->
      current_index(CoinPrice.current(coin), CoinPrice.previous(coin), total_market_cap)
    end)
  end

  defp current_index(
         %{market_cap: market_cap, price: current_price},
         %{price: previous_price},
         total_market_cap
       ) do
    current_quote = market_cap / total_market_cap
    current_quote * (current_price - previous_price) / previous_price
  end

  defp current_index(%{market_cap: market_cap, price: current_price}, _, total_market_cap) do
    current_quote = market_cap / total_market_cap
    current_quote * current_price
  end

  defp previous_index(nil) do
    100.0
  end

  defp previous_index(index) do
    index.value
  end

  defp response({:ok, value}, time) do
    {:ok, %{value: value, time: time, type: "top_10"}}
  end

  defp response({:error, _} = error, time) do
    {:error, %{time: time, type: "top_10", message: error.message}}
  end
end
