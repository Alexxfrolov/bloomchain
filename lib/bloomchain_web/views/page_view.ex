defmodule BloomchainWeb.PageView do
  use BloomchainWeb, :view
  alias BloomchainWeb.Uploaders.Cover

  def render_main_article(item, conn: conn, path: path) do
    content_tag(:a, class: "bc-article__overlay-link", href: path) do
      content_tag(:div, class: "bc-article__image") do
        [
          img_tag(Cover.url({item.cover, item}, :original)),
          content_tag(:p, item.title),
          content_tag(:div, class: "d-flex align-items-center") do
            do_article_attrs(item)
          end
        ]
      end
    end
  end

  def render_article(item, conn: conn, path: path) do
    content_tag(:div) do
      [
        link(item.title, to: path, class: "bc-article__heading"),
        content_tag(:p, item.lead, class: "bc-article__paragraph"),
        content_tag(:div, class: "d-flex align-items-center mt-3") do
          do_article_attrs(item)
        end
      ]
    end
  end

  def render_short(item, conn: conn) do
    content_tag(:div, class: "bc-news__item") do
      [
        content_tag(:span, Timex.format!(item.published_at, "%H:%M", :strftime),
          class: "bc-news__time"
        ),
        link(item.title,
          to: newsfeed_path(conn, :show, item.slug),
          class: "bc-news__title bc-article__heading font-weight-medium"
        )
      ]
    end
  end

  defp do_article_attrs(item) do
    [
      content_tag(:span, Timex.format!(item.published_at, "{relative}", :relative),
        class: "small mr-sm-4 mr-2"
      ),
      content_tag(:i, nil, class: "mr-1 icon-clock-white"),
      content_tag(:span, "#{item.time} мин", class: "small")
    ]
  end
end
