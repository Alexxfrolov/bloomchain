defmodule Bloomchain.Paginator do
  import Ecto.Query
  alias Bloomchain.{Paginator, Repo}

  defstruct [:entries, :metadata]

  def paginate(query, %{page_size: _} = params) do
    page_number = params |> Map.get(:page, 1) |> to_int
    page_size = params |> Map.get(:page_size) |> to_int
    total_items = total_items(query)

    %Paginator{
      entries: entries(query, page_number, page_size),
      metadata: %{
        page: page_number,
        page_size: page_size,
        total_items: total_items,
        total_pages: total_pages(total_items, page_size)
      }
    }
  end

  def paginate(query, _params) do
    %{
      entries: query |> Repo.all(),
      metadata: %{}
    }
  end

  defp entries(query, page_number, page_size) do
    offset = page_size * (page_number - 1)

    query
    |> limit([_], ^page_size)
    |> offset([_], ^offset)
    |> Repo.all()
  end

  defp to_int(i) when is_integer(i), do: i

  defp to_int(s) when is_binary(s) do
    case Integer.parse(s) do
      {i, _} -> i
      :error -> :error
    end
  end

  defp total_items(query) do
    query
    |> exclude(:order_by)
    |> exclude(:preload)
    |> exclude(:select)
    |> select([e], count(e.id))
    |> Repo.one()
  end

  defp total_pages(total_items, page_size) do
    ceiling(total_items / page_size)
  end

  defp ceiling(float) do
    t = trunc(float)

    case float - t do
      neg when neg < 0 ->
        t

      pos when pos > 0 ->
        t + 1

      _ ->
        t
    end
  end
end
