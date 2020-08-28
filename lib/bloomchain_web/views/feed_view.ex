defmodule BloomchainWeb.FeedView do
  use BloomchainWeb, :view

  import Phoenix.Controller, only: [current_url: 1]
  alias Bloomchain.{Repo, Content.Section}

  def format_date(datetime) do
    Timex.format!(Timex.to_datetime(datetime, "UTC"), "{RFC1123}")
  end

  def parse_markdown(markdown), do: Phoenix.HTML.raw(markdown) |> elem(1)

  def title(type) do
    Repo.get_by!(Section, slug: type).seo_settings["title"]
  end

  def description(type) do
    Repo.get_by!(Section, slug: type).seo_settings["description"]
  end

  def post_description(item) do
    (item.lead || first_paragraph(item.body))
    |> parse_markdown
  end

  def guid(item), do: "bloomchain_posts_#{item.type}_#{item.id}"

  defp first_paragraph(body) do
    Regex.run(~r/(?=<p)(.*?)(?<=<\/p>)/, body, capture: :first)
    |> List.first()
    |> Floki.text()
  end
end
