defmodule BloomchainWeb.Plug.SetSectionData do
  import Plug.Conn, only: [assign: 3]

  alias Bloomchain.Content.Section

  def init(_params), do: nil

  @doc """
   Preload all sections for site
  """
  def call(conn, _params) do
    conn
    |> assign(:sections, Section.map())
  end
end
