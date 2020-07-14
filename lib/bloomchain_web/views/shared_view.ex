defmodule BloomchainWeb.SharedView do
  use BloomchainWeb, :view

  alias BloomchainWeb.Uploaders.File

  def load_more_button(%{after: nil}) do
  end

  def load_more_button(%{after: after_cursor, query: query}) do
    content_tag(:div, class: "container px-0 pb-5 js-scroll-button-container") do
      content_tag(
        :button,
        "Загрузить еще",
        class: "bc-article__btn-link btn btn-link js-scroll-button",
        type: "button",
        data_scroll: after_cursor,
        data_query: query
      )
    end
  end

  def load_more_button(%{after: after_cursor}) do
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

  def main_article_tag(nil, conn: _conn), do: ""

  def main_article_tag(item, conn: _conn) do
    content_tag(:a, class: "bc-article__overlay-link", href: href_path(item)) do
      content_tag(:div, class: "bc-article__image") do
        [
          do_image_tag(item),
          content_tag(:p, Phoenix.HTML.raw(item.title), class: "line-clamp line-clamp__size_2"),
          content_tag(:div, class: "d-flex align-items-center") do
            article_attrs(item)
          end
        ]
      end
    end
  end

  def main_article_tag(nil, :without_img, conn: _conn), do: ""

  def main_article_tag(item, :without_img, conn: _conn) do
    content_tag(:div) do
      [
        link(Phoenix.HTML.raw(item.title),
          to: href_path(item),
          class: "bc-article__heading bc-article__heading__h2 line-clamp line-clamp__size_2"
        ),
        content_tag(:p, Phoenix.HTML.raw(item.lead),
          class: "bc-article__paragraph mt-2 line-clamp line-clamp__size_3"
        ),
        content_tag(:div, class: "d-flex align-items-center mt-3") do
          article_attrs(item)
        end
      ]
    end
  end

  def article_tag(nil, conn: _conn), do: ""

  def article_tag(item, conn: _conn) do
    content_tag(:div, class: "col-xl-6") do
      [
        content_tag(:hr, nil, class: "bc-article__separator mx-0 my-3"),
        link(Phoenix.HTML.raw(item.title),
          to: href_path(item),
          class: "bc-article__heading line-clamp line-clamp__size_2"
        ),
        content_tag(:p, Phoenix.HTML.raw(item.lead),
          class: "bc-article__paragraph mt-1 line-clamp line-clamp__size_3"
        ),
        content_tag(:div, class: "d-flex align-items-center mt-3") do
          article_attrs(item)
        end
      ]
    end
  end

  def article_attrs(%{time: nil} = item) do
    [
      content_tag(:span, time_from(item.published_at), class: "small mr-sm-4 mr-2"),
      content_tag(:i, nil, class: "mr-1 icon-user-white"),
      content_tag(:span, author(item), class: "small mr-sm-4 mr-3")
    ]
  end

  def article_attrs(%{time: time} = item) do
    [
      content_tag(:span, time_from(item.published_at), class: "small mr-sm-4 mr-2"),
      content_tag(:i, nil, class: "mr-1 icon-user-white"),
      content_tag(:span, author(item), class: "small mr-sm-4 mr-3"),
      content_tag(:i, nil, class: "mr-1 icon-clock-white"),
      content_tag(:span, "#{time} мин", class: "small")
    ]
  end

  def timestamp(nil), do: ""

  def timestamp(datetime) do
    datetime
    |> Timex.local()
    |> Timex.format!("%d.%m.%Y %H:%M", :strftime)
  end

  def author(item) do
    item.authors |> Enum.map(fn i -> i.name end) |> Enum.join(", ")
  end

  defp do_image_tag(%{cover: nil}), do: ""

  defp do_image_tag(%{cover: cover}) do
    content_tag(:picture, class: "picture") do
      [
        tag(:source,
          media: "(min-width: 800px)",
          srcset:
            [
              File.url({cover.file, cover}, :desktop),
              File.url({cover.file, cover}, :desktop_2x) <> " 2x"
            ]
            |> Enum.join(", ")
        ),
        tag(:source,
          media: "(min-width: 540px)",
          srcset:
            [
              File.url({cover.file, cover}, :tablet),
              File.url({cover.file, cover}, :tablet_2x) <> " 2x"
            ]
            |> Enum.join(", ")
        ),
        tag(:source,
          media: "(min-width: 320px)",
          srcset:
            [
              File.url({cover.file, cover}, :mobile),
              File.url({cover.file, cover}, :mobile_2x) <> " 2x"
            ]
            |> Enum.join(", ")
        ),
        img_tag(File.url({cover.file, cover}, :original))
      ]
    end
  end

  defp href_path(item), do: "/#{item.type}/#{item.slug}"

  defp time_from(datetime) do
    Timex.lformat!(datetime, "{relative}", "ru", :relative)
  end
end
