defmodule BloomchainWeb.SitemapViewTest do
  use BloomchainWeb.ConnCase
  alias BloomchainWeb.SitemapView

  test "format_date/1" do
    assert SitemapView.format_date(~N[2020-05-06 13:15:00]) == "2020-05-06T13:15:00+00:00"
  end
end
