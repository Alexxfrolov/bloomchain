defmodule BloomchainWeb.Admin.Api.V1.ArticleView do
  use BloomchainWeb, :view

  import BloomchainWeb.Admin.Api.V1.TagView, only: [tag_json: 1]

  def render("index.json", %{articles: articles}) do
    %{
      data: Enum.map(articles, &article_json/1)
    }
  end

  def render("show.json", %{article: article}) do
    article_json(article)
  end

  def article_json(article) do
    %{
      id: article.id,
      title: article.title,
      slug: article.slug,
      lead: article.lead,
      body: article.body,
      type: article.type,
      author: article.author,
      description: article.description,
      keywords: article.keywords,
      created_at: article.inserted_at,
      updated_at: article.updated_at,
      published_at: article.published_at,
      tags: Enum.map(article.tags, &tag_json/1)
    }
  end
end
