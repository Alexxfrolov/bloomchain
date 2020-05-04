defmodule BloomchainWeb.Api.IndexView do
  use BloomchainWeb, :view

  def render("index.json", %{data: data}) do
    data |> Enum.map(&[&1[:time] * 1000, &1[:value]])
  end
end
