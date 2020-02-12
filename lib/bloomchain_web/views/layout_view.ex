defmodule BloomchainWeb.LayoutView do
  use BloomchainWeb, :view

  def active_navlink_class(conn, path) do
    current_path = Path.join(["/" | conn.path_info])

    if path == current_path do
      "nav-link nav-link--active"
    else
      "nav-link"
    end
  end
end
