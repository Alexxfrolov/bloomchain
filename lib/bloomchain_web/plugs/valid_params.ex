defmodule Bloomchain.Plug.ValidParams do
  import Plug.Conn, only: [assign: 3]

  def valid_filters(%{params: params} = conn, _params) do
    conn |> assign(:filters, %{since: params[:since], until: params[:until]})
  end

  def valid_sort_params(%{params: %{sort_by: str}} = conn, _params) do
    sort_params =
      str
      |> String.split(",")
      |> Enum.map(fn item ->
        direction = if(String.match?(item, ~r/asc/), do: :asc, else: :desc)
        field = Regex.run(~r/(?<=\().*(?=\))/, item) |> List.first() |> String.to_atom()
        {direction, field}
      end)

    conn |> assign(:sort_params, sort_params)
  end

  def valid_sort_params(conn, _params) do
    conn |> assign(:sort_params, desc: :inserted_at)
  end
end
