defmodule Bloomchain.Service.CoinList do
  def call do
    request_data()
    |> process_response()
  end

  defp request_data() do
    url = Application.get_env(:bloomchain, :coinmarket)[:url] <> "/v1/cryptocurrency/map"

    headers = [
      "X-CMC_PRO_API_KEY": Application.get_env(:bloomchain, :coinmarket)[:api_key],
      Accept: "application/json"
    ]

    params = []

    HTTPoison.get(url, headers, params)
  end

  defp process_response({:ok, %{status_code: 200, body: body}}) do
    response = Poison.decode!(body)

    data =
      Enum.map(response["data"], fn item ->
        %{
          id: item["id"],
          name: item["name"],
          symbol: item["symbol"],
          slug: item["slug"],
          inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
          updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
        }
      end)

    {:ok, data}
  end

  defp process_response(_) do
    {:error, %{message: "Service Unavailable"}}
  end
end
