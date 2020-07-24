defmodule BloomchainWeb.SectionView do
  use BloomchainWeb, :view
  alias BloomchainWeb.SharedView
  alias Bloomchain.Content.Media
  alias BloomchainWeb.Uploaders.File

  def item_tag(item) do
    content_tag(:div, class: "bc-news__item") do
      [
        content_tag(:span, formatted_time(item.published_at), class: "bc-news__time"),
        link(
          Phoenix.HTML.raw(item.title),
          to: href_path(item),
          class: "bc-news__title bc-article__heading font-weight-medium"
        )
      ]
    end
  end

  def load_more_button(%Paginator.Page.Metadata{after: nil}, last_date: _) do
  end

  def load_more_button(%Paginator.Page.Metadata{after: after_cursor}, last_date: date) do
    content_tag(:div, class: "container px-0 pb-5 js-scroll-button-container") do
      content_tag(
        :button,
        "Загрузить еще",
        class: "bc-article__btn-link btn btn-link js-scroll-button",
        type: "button",
        data_scroll: after_cursor,
        data_date: date
      )
    end
  end

  # used for archives
  def image_tag(%{cover: %{reloaded: true} = cover}, class: class) do
    content_tag(:picture, class: class) do
      [
        tag(:source,
          type: "image/webp",
          sizes: "100vw",
          srcset: Media.srcset(cover, :webp)
        ),
        tag(:source,
          type: "image/jp2",
          sizes: "100vw",
          srcset: Media.srcset(cover, :jp2)
        ),
        img_tag(File.url({cover.file, cover}, :original), alt: cover[:alt])
      ]
    end
  end

  defp formatted_weekday(date) do
    case Date.day_of_week(date) do
      1 -> "Понедельник"
      2 -> "Вторник"
      3 -> "Среда"
      4 -> "Четверг"
      5 -> "Пятница"
      6 -> "Суббота"
      7 -> "Воскресенье"
    end
  end

  defp formatted_time(datetime) do
    datetime
    |> Timex.local()
    |> Timex.format!("%H:%M", :strftime)
  end

  defp formatted_date(date) do
    date
    |> Timex.local()
    |> Timex.format!("%d.%m.%Y", :strftime)
  end

  defp href_path(item) do
    "/#{item.type}/#{item.slug}"
  end
end
