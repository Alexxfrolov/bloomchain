defmodule BloomchainWeb.SitemapControllerTest do
  use BloomchainWeb.ConnCase

  describe "GET /sitemap.xml" do
    test "accesses the sitemap in format xml", %{conn: conn} do
      conn = get(conn, "/sitemap.xml")
      assert response_content_type(conn, :xml)

      assert response(conn, 200) =~ ~r/<loc>.*main.xml<\/loc>/
      assert response(conn, 200) =~ ~r/<loc>.*resources.xml<\/loc>/
      assert response(conn, 200) =~ ~r/<loc>.*tags.xml<\/loc>/
    end
  end
end
