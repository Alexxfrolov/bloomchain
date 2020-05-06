defmodule BloomchainWeb.Api.IndexController do
  use BloomchainWeb, :controller

  alias Bloomchain.Content.Index

  def index(conn, %{type: type, period: period}) do
    conn
    |> render("index.json", data: Index.list(type, make_period(period)))
  end

  def index(conn, %{type: type, since: since, until: until}) do
    conn
    |> render("index.json", data: Index.list(type, %{since: since, until: until}))
  end

  defp make_period(period) do
    case period do
      "1h" ->
        %{since: Timex.now() |> Timex.shift(hours: -1) |> Timex.to_unix()}

      "12h" ->
        %{since: Timex.now() |> Timex.shift(hours: -12) |> Timex.to_unix()}

      "1d" ->
        %{since: Timex.now() |> Timex.shift(days: -1) |> Timex.to_unix()}

      "1w" ->
        %{since: Timex.now() |> Timex.shift(weeks: -1) |> Timex.to_unix()}

      "1m" ->
        %{since: Timex.now() |> Timex.shift(months: -1) |> Timex.to_unix()}

      "3m" ->
        %{since: Timex.now() |> Timex.shift(months: -3) |> Timex.to_unix()}

      "1y" ->
        %{since: Timex.now() |> Timex.shift(years: -1) |> Timex.to_unix()}

      "all" ->
        %{}
    end
  end
end
