defmodule BloomchainWeb.LayoutView do
  use BloomchainWeb, :view

  def title(assigns) do
    assigns[:title] || get_in(assigns, [:article, :title]) ||
      "Bloomchain — Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"
  end

  def meta(:description, assigns) do
    assigns[:description] || get_in(assigns, [:article, :seo_settings, "description"]) ||
      "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"
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
      "Bloomchain — Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"
  end

  def meta(:og_description, assigns) do
    assigns[:og_description] || assigns[:description] ||
      get_in(assigns, [:article, :seo_settings, "og_description"]) ||
      "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"
  end

  def meta(:og_image, assigns) do
    assigns[:og_image] || get_in(assigns, [:article, :seo_settings, "og_image"]) || ""
  end

  def meta(:twitter_title, assigns) do
    assigns[:twitter_title] || assigns[:title] ||
      get_in(assigns, [:article, :seo_settings, "twitter_title"]) ||
      "Bloomchain — Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"
  end

  def meta(:twitter_description, assigns) do
    assigns[:twitter_description] || assigns[:description] ||
      get_in(assigns, [:article, :seo_settings, "twitter_description"]) ||
      "Информационно-аналитическое сообщество о блокчейне, криптовалютах, ICO и финтехе"
  end

  def meta(:twitter_image, assigns) do
    assigns[:twitter_image] || get_in(assigns, [:article, :seo_settings, "twitter_image"]) || ""
  end

  def active_navlink_class(conn, path) do
    current_path = Path.join(["/" | conn.path_info])

    if path == current_path do
      "nav-link nav-link--active"
    else
      "nav-link"
    end
  end
end
