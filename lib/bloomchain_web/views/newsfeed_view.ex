defmodule BloomchainWeb.NewsfeedView do
  require Integer
  use BloomchainWeb, :view

  def header_tag(date) do
    content_tag(:h1, class: "highlight highlight-date mt-4") do
      [
        content_tag(:span, formatted_weekday(date), class: "mr-1 d-inline-flex"),
        content_tag(:span, formatted_date(date), class: "d-inline-flex font-weight-semibold")
      ]
    end
  end

  def item_tag(item) do
    content_tag(:div, class: "bc-news__item") do
      [
        content_tag(:span, formatted_time(item.published_at), class: "bc-news__time"),
        link(
          item.title,
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

  defp formatted_weekday(date) do
    case Date.day_of_week(date) do
      1 -> "Понедельник"
      2 -> "Вторни"
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
    |> Timex.format!("%H:%m", :strftime)
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
