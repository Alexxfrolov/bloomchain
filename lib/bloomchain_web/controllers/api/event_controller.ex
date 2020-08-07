defmodule BloomchainWeb.Api.EventController do
  use BloomchainWeb, :controller

  alias Bloomchain.Repo
  alias Bloomchain.Content.{Event, Statistic}

  def create(conn, %{type: type, banner_id: banner_id} = params) do
    Event.changeset(%Event{}, event_params(conn, params)) |> Repo.insert!()

    conn
    |> send_resp(201, "")
  end

  defp event_params(conn, params) do
    params
    |> Map.merge(%{
      ip: conn.remote_ip |> :inet.ntoa() |> to_string(),
      user_agent: get_req_header(conn, "user-agent") |> List.first()
    })
  end
end
