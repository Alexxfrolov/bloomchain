defmodule BloomchainWeb.Admin.Api.V1.ArticleView do
  use BloomchainWeb, :view

  import BloomchainWeb.Admin.Api.V1.TagView, only: [tag_json: 1]
  import BloomchainWeb.Admin.Api.V1.MediaView, only: [media_json: 1]

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
      lead: article.lead,
      type: article.type,
      status: article.status,
      author: article.author,
      description: article.description,
      keywords: article.keywords,
      total_views: article.total_views,
      time: article.time,
      created_at: article.inserted_at,
      updated_at: article.updated_at,
      published_at: article.published_at,
      tags: Enum.map(article.tags, &tag_json/1)
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
      author: article.author,
      description: article.description,
      keywords: article.keywords,
      total_views: article.total_views,
      time: article.time,
      created_at: article.inserted_at,
      updated_at: article.updated_at,
      published_at: article.published_at,
      tags: Enum.map(article.tags, &tag_json/1),
      authors: [],
      cover: media_json(article.cover)
    }
  end
end
