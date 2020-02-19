defmodule BloomchainWeb.Api.V1.TagView do
  use BloomchainWeb, :view

  def render("index.json", %{articles: articles}) do
    %{
      articles: Enum.map(articles, &article_json/1)
    }
  end

  def article_json(article) do
    %{
      title: article.title,
      lead: article.lead,
      inserted_at: article.inserted_at,
      updated_at: article.updated_at
    }
  end
end
