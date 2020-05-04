defmodule BloomchainWeb.PageControllerTest do
  use BloomchainWeb.ConnCase

  test "GET /admin", %{conn: conn} do
    conn = get(conn, "/admin")

    assert html_response(conn, 302) =~
             "You are being <a href=\"/session/new\">redirected</a>"
  end
end
