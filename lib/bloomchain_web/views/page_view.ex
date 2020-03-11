defmodule BloomchainWeb.PageView do
  use BloomchainWeb, :view

  alias BloomchainWeb.Uploaders.File
  alias BloomchainWeb.SharedView

  def render_main_article(nil, conn: _, path: _), do: ""

  def render_main_article(item, conn: _conn, path: path) do
    content_tag(:a, class: "bc-article__overlay-link", href: path) do
      content_tag(:div, class: "bc-article__image") do
        [
          do_image_tag(item),
          content_tag(:p, item.title),
          content_tag(:div, class: "d-flex align-items-center") do
            do_article_attrs(item)
          end
        ]
      end
    end
  end

  def render_article(item, conn: _conn, path: path) do
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
        content_tag(
          :span,
          date_time_format(item.published_at),
          class: "bc-news__time"
        ),
        link(
          item.title,
          to: newsfeed_path(conn, :show, item.slug),
          class: "bc-news__title bc-article__heading font-weight-medium"
        )
      ]
    end
  end

  defp do_image_tag(%{cover: nil}), do: ""

  defp do_image_tag(%{cover: cover}) do
    img_tag(File.url({cover.file, cover}))
  end

  defp do_article_attrs(item) do
    [
      content_tag(
        :span,
        Timex.format!(item.published_at, "{relative}", :relative),
        class: "small mr-sm-4 mr-2"
      ),
      content_tag(:i, nil, class: "mr-1 icon-clock-white"),
      content_tag(:span, "#{item.time} мин", class: "small")
    ]
  end

  defp date_time_format(datetime) do
    time = Timex.format!(datetime, "%H:%M", :strftime)

    month =
      case datetime.month do
        1 -> "Янв."
        2 -> "Февр."
        3 -> "Марта"
        4 -> "Апр."
        5 -> "Мая"
        6 -> "Июня"
        7 -> "Июля"
        8 -> "Авг."
        9 -> "Сент."
        10 -> "Окт."
        11 -> "Нояб."
        12 -> "Дек."
      end

    "#{datetime.day} #{month} #{time}"
  end
end
