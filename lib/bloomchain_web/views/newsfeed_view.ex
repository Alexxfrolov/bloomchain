defmodule BloomchainWeb.NewsfeedView do
  use BloomchainWeb, :view

  def header_tag(_date) do
    content_tag(:h1, class: "highlight highlight-date") do
      [
        content_tag(:span, "Четверг", class: "mr-1 d-inline-flex"),
        content_tag(:span, "14.05.2018", class: "d-inline-flex font-weight-semibold")
      ]
    end
  end

  def item_tag(item) do
    content_tag(:div, class: "bc-news__item") do
      [
        content_tag(:span, time(item.published_at), class: "bc-news__time"),
        link(
          item.title,
          to: href_path(item),
          class: "bc-news__title bc-article__heading font-weight-medium"
        )
      ]
    end
  end

  defp time(datetime) do
    Timex.format!(datetime, "%H:%m", :strftime)
  end

  defp href_path(item) do
    "/#{item.type}/#{item.slug}"
  end
end
