defmodule BloomchainWeb.Api.EventController do
  use BloomchainWeb, :controller

  alias Bloomchain.Repo
  alias Bloomchain.Content.{Event, Banner}

  def create(conn, %{type: _, banner_id: banner_id} = params) do
    Task.async(fn ->
      Event.changeset(%Event{}, event_params(conn, params)) |> Repo.insert!()
      Banner.inc_total_views(%{id: banner_id})
    end)

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
