defmodule BloomchainWeb.Admin.Api.V1.ArticleView do
  use BloomchainWeb, :view

  import BloomchainWeb.Admin.Api.V1.TagView, only: [tag_json: 1]
  import BloomchainWeb.Admin.Api.V1.MediaView, only: [media_json: 1]
  import BloomchainWeb.Admin.Api.V1.AuthorView, only: [author_json: 1]

  def render("index.json", %{articles: articles}) do
    %{
      data: Enum.map(articles, &article_json/1)
    }
  end

  def render("show.json", %{article: article}) do
    article_json(article, :full)
  end

  def article_json(article) do
    %{
      id: article.id,
      title: article.title,
      slug: article.slug,
      url: do_link(article),
      lead: article.lead,
      type: article.type,
      status: article.status,
      description: article.description,
      keywords: article.keywords,
      total_views: article.total_views,
      time: article.time,
      created_at: article.inserted_at |> Timex.local(),
      updated_at: article.updated_at |> Timex.local(),
      published_at: do_published_at(article),
      tags: Enum.map(article.tags, &tag_json/1),
      authors: Enum.map(article.authors, &author_json/1)
    }
  end

  def article_json(article, :full) do
    %{
      id: article.id,
      title: article.title,
      slug: article.slug,
      lead: article.lead,
      body: article.body,
      type: article.type,
      status: article.status,
      description: article.description,
      keywords: article.keywords,
      total_views: article.total_views,
      time: article.time,
      created_at: article.inserted_at |> Timex.local(),
      updated_at: article.updated_at |> Timex.local(),
      published_at: do_published_at(article),
      tags: Enum.map(article.tags, &tag_json/1),
      authors: Enum.map(article.authors, &author_json/1),
      cover: media_json(article.cover)
    }
  end

  defp do_link(item) do
    case item.type do
      "person" -> "/people/#{item.slug}"
      "in_russia" -> "/in-russia/#{item.slug}"
      _ -> "/#{item.type}/#{item.slug}"
    end
  end

  defp do_published_at(%{published_at: nil}) do
  end

  defp do_published_at(%{published_at: published_at}) do
    published_at |> Timex.local()
  end
end
