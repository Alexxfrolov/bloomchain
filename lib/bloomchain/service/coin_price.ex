defmodule Bloomchain.Service.CoinPrice do
  def call do
    request_data()
    |> process_response()
  end

  defp request_data() do
    url =
      Application.get_env(:bloomchain, :coinmarket)[:url] <> "/v1/cryptocurrency/listings/latest"

    headers = [
      "X-CMC_PRO_API_KEY": Application.get_env(:bloomchain, :coinmarket)[:api_key],
      Accept: "application/json"
    ]

    params = [start: 1, limit: 10, convert: "USD"]

    HTTPoison.get(url, headers, params)
  end

  defp process_response({:ok, %{status_code: 200, body: body}}) do
    response = Poison.decode!(body)

    data =
      Enum.map(response["data"], fn item ->
        %{
          price: %{
            coin_id: item["id"],
            currency: "USD",
            price: get_in(item, ["quote", "USD", "price"]),
            volume_24h: get_in(item, ["quote", "USD", "volume_24h"]),
            market_cap: get_in(item, ["quote", "USD", "market_cap"]),
            percent_change_1h: get_in(item, ["quote", "USD", "percent_change_1h"]),
            percent_change_24h: get_in(item, ["quote", "USD", "percent_change_24h"]),
            percent_change_7d: get_in(item, ["quote", "USD", "percent_change_7d"]),
            rank: item["cmc_rank"]
          },
          coin: %{
            id: item["id"],
            name: item["name"],
            symbol: item["symbol"],
            slug: item["slug"],
            rank: item["cmc_rank"]
          }
        }
      end)

    {:ok, data}
  end

  defp process_response(_) do
    {:error, %{message: "Service Unavailable"}}
  end
end
