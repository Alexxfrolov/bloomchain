defmodule BloomchainWeb.SharedView do
  use BloomchainWeb, :view

  alias BloomchainWeb.Uploaders.File

  def main_article_tag(item) do
    content_tag(:a, class: "bc-article__overlay-link", href: href_path(item)) do
      content_tag(:div, class: "bc-article__image") do
        [
          img_tag(File.url({item.cover.file, item.cover})),
          content_tag(:p, item.title),
          content_tag(:div, class: "d-flex align-items-center") do
            do_article_attrs(item)
          end
        ]
      end
    end
  end

  def main_article_tag(item, :without_img) do
    content_tag(:div) do
      [
        link(item.title, to: href_path(item), class: "bc-article__heading"),
        content_tag(:p, item.lead, class: "bc-article__paragraph"),
        content_tag(:div, class: "d-flex align-items-center mt-3") do
          do_article_attrs(item)
        end
      ]
    end
  end

  def article_tag(item) do
    content_tag(:div, class: "col-xl-6") do
      [
        link(item.title, to: href_path(item), class: "bc-article__heading"),
        content_tag(:p, item.lead, class: "bc-article__paragraph"),
        content_tag(:div, class: "d-flex align-items-center mt-3") do
          do_article_attrs(item)
        end
      ]
    end
  end

  defp do_article_attrs(item) do
    [
      content_tag(
        :span,
        Timex.format!(item.published_at, "{relative}", :relative),
        class: "small mr-sm-4 mr-2"
      ),
      content_tag(:i, nil, class: "mr-1 icon-user-white"),
      content_tag(:span, item.author, class: "small mr-sm-4 mr-3"),
      content_tag(:i, nil, class: "mr-1 icon-view"),
      content_tag(:span, item.total_views, class: "small mr-4"),
      content_tag(:i, nil, class: "mr-1 icon-clock-white"),
      content_tag(:span, "#{item.time} мин", class: "small")
    ]
  end

  defp href_path(item) do
    "/#{item.type}/#{item.slug}"
  end
end
