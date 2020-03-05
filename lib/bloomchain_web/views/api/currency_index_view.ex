defmodule BloomchainWeb.Api.CurrencyIndexView do
  use BloomchainWeb, :view

  def render("index.json", %{data: data}) do
    data
  end
end
