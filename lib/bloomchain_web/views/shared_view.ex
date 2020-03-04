defmodule BloomchainWeb.SharedView do
  use BloomchainWeb, :view

  alias BloomchainWeb.Uploaders.File

  def main_article_tag(item, conn: conn) do
    content_tag(:a, class: "bc-article__overlay-link", href: href_path(item, conn)) do
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

  def main_article_tag(item, :without_img, conn: conn) do
    content_tag(:div) do
      [
        link(item.title, to: href_path(item, conn), class: "bc-article__heading"),
        content_tag(:p, item.lead, class: "bc-article__paragraph"),
        content_tag(:div, class: "d-flex align-items-center mt-3") do
          do_article_attrs(item)
        end
      ]
    end
  end

  def article_tag(item, conn: conn) do
    content_tag(:div, class: "col-xl-6") do
      [
        link(item.title, to: href_path(item, conn), class: "bc-article__heading"),
        content_tag(:p, item.lead, class: "bc-article__paragraph"),
        content_tag(:div, class: "d-flex align-items-center mt-3") do
          do_article_attrs(item)
        end
      ]
    end
  end

  def load_more_button(%Paginator.Page.Metadata{after: nil}, conn: _) do
  end

  def load_more_button(%Paginator.Page.Metadata{after: after_cursor}, conn: conn) do
    content_tag(:div, class: "container px-0 pb-5 js-scroll-button-container") do
      content_tag(
        :button,
        "Загрузить еще",
        class: "bc-article__btn-link btn btn-link js-scroll-button",
        type: "button",
        data_scroll: after_cursor
      )
    end
  end

  defp do_article_attrs(item) do
    [
      content_tag(:span, time_from(item.published_at), class: "small mr-sm-4 mr-2"),
      content_tag(:i, nil, class: "mr-1 icon-user-white"),
      content_tag(:span, item.author, class: "small mr-sm-4 mr-3"),
      content_tag(:i, nil, class: "mr-1 icon-view"),
      content_tag(:span, item.total_views, class: "small mr-4"),
      content_tag(:i, nil, class: "mr-1 icon-clock-white"),
      content_tag(:span, "#{item.time} мин", class: "small")
    ]
  end

  defp href_path(item, conn) do
    "#{conn.request_path}/#{item.slug}"
  end

  defp time_from(datetime) do
    Timex.format!(datetime, "{relative}", :relative)
  end
end
