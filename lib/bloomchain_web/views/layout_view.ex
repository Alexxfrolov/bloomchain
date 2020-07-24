defmodule BloomchainWeb.LayoutView do
  use BloomchainWeb, :view
  alias BloomchainWeb.Router.Helpers

  def title(assigns) do
    assigns[:title] || get_in(assigns, [:article, :title]) ||
      get_in(assigns, [:sections, assigns.conn.path_params["type"], :seo, "title"]) ||
      get_in(assigns, [:sections, "default", :seo, "title"])
  end

  def meta(:description, assigns) do
    assigns[:description] || get_in(assigns, [:article, :seo_settings, "description"]) ||
      get_in(assigns, [:sections, assigns.conn.path_params["type"], :seo, "description"]) ||
      get_in(assigns, [:sections, "default", :seo, "description"])
  end

  def meta(:keywords, assigns) do
    (assigns[:keywords] || get_in(assigns, [:article, :seo_settings, "keywords"]) || [])
    |> Enum.join(", ")
  end

  def meta(:og_url, assigns) do
    assigns[:og_url] || get_in(assigns, [:article, :seo_settings, "og_url"]) || ""
  end

  def meta(:og_type, assigns) do
    assigns[:og_type] || get_in(assigns, [:article, :seo_settings, "og_type"]) || ""
  end

  def meta(:og_title, assigns) do
    assigns[:og_title] || assigns[:title] ||
      get_in(assigns, [:article, :seo_settings, "og_title"]) ||
      get_in(assigns, [:sections, assigns.conn.path_params["type"], :seo, "title"]) ||
      get_in(assigns, [:sections, "default", :seo, "title"])
  end

  def meta(:og_description, assigns) do
    assigns[:og_description] || assigns[:description] ||
      get_in(assigns, [:article, :seo_settings, "og_description"]) ||
      get_in(assigns, [:sections, assigns.conn.path_params["type"], :seo, "description"]) ||
      get_in(assigns, [:sections, "default", :seo, "description"])
  end

  def meta(:og_image, assigns) do
    assigns[:og_image] || get_in(assigns, [:article, :seo_settings, "og_image"]) ||
      Helpers.static_url(assigns.conn, "/customer/images/logo.jpg")
  end

  def meta(:twitter_title, assigns) do
    assigns[:twitter_title] || assigns[:title] ||
      get_in(assigns, [:article, :seo_settings, "twitter_title"]) ||
      get_in(assigns, [:sections, assigns.conn.path_params["type"], :seo, "title"]) ||
      get_in(assigns, [:sections, "default", :seo, "title"])
  end

  def meta(:twitter_description, assigns) do
    assigns[:twitter_description] || assigns[:description] ||
      get_in(assigns, [:article, :seo_settings, "twitter_description"]) ||
      get_in(assigns, [:sections, assigns.conn.path_params["type"], :seo, "description"]) ||
      get_in(assigns, [:sections, "default", :seo, "description"])
  end

  def meta(:twitter_image, assigns) do
    assigns[:twitter_image] || get_in(assigns, [:article, :seo_settings, "twitter_image"]) ||
      Helpers.static_url(assigns.conn, "/customer/images/logo.jpg")
  end

  def rss_link(conn) do
    type = conn.path_info |> List.first()

    if(Enum.member?(~w(newsfeed detailed in-russia people research analysis calendar), type)) do
      feed_path(conn, :show, type)
    else
      feed_path(conn, :index)
    end
  end

  def active_navlink_class(conn, path) do
    current_path = Path.join(["/" | conn.path_info])

    if Regex.match?(~r/#{path}/, current_path) do
      "nav-link nav-link--active"
    else
      "nav-link"
    end
  end
end
