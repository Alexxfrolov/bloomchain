defmodule Bloomchain.Index.Bitcoin do
  @binance_url "https://www.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT"
  @bitstamp_url "https://www.bitstamp.net/api/v2/ticker/btcusd"

  def call do
    request_data()
    |> calculate_index
  end

  defp request_data() do
    timestamp = Timex.now() |> Timex.to_unix()

    with {:ok, %{status_code: 200, body: binance}} <- HTTPoison.get(@binance_url),
         {:ok, %{status_code: 200, body: bitstamp}} <- HTTPoison.get(@bitstamp_url) do
      {:ok,
       %{
         time: timestamp,
         binance: Poison.decode!(binance),
         bitstamp: Poison.decode!(bitstamp)
       }}
    else
      {:error, _} -> {:error, %{message: "Service Unavailable", time: timestamp, type: "bitcoin"}}
    end
  end

  defp calculate_index(
         {:ok,
          %{
            binance: %{"lastPrice" => binance_price, "quoteVolume" => binance_volume},
            bitstamp: %{"last" => bitstamp_price, "volume" => bitstamp_volume},
            time: time
          }}
       ) do
    {binance_price, _} = Float.parse(binance_price)
    {binance_volume, _} = Float.parse(binance_volume)
    {bitstamp_price, _} = Float.parse(bitstamp_price)
    {bitstamp_volume, _} = Float.parse(bitstamp_volume)

    value =
      ((binance_price * binance_volume + bitstamp_price * bitstamp_volume) /
         (binance_volume + bitstamp_volume))
      |> Float.ceil(2)

    {
      :ok,
      %{
        value: value,
        type: "bitcoin",
        time: time
      }
    }
  end

  defp calculate_index({:ok, data}) do
    {:error, %{message: "Broken Structure", time: data["time"], type: "bitcoin"}}
  end

  defp calculate_index({:error, _} = error), do: error
end
