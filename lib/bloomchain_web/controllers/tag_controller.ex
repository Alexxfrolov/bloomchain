defmodule BloomchainWeb.TagController do
  use BloomchainWeb, :controller

  alias Bloomchain.{Repo, Content.Tag}
  alias Bloomchain.ElasticsearchCluster, as: ES
  alias BloomchainWeb.Workflow.RecomendationPosts

  def show(conn, %{slug: tag, scroll: scroll}) do
    %{entries: articles, metadata: meta} = do_query(tag, scroll) |> ES.search()

    conn
    |> put_resp_header("x-pagination-scroll", to_string(meta.after))
    |> put_layout(false)
    |> put_view(BloomchainWeb.SharedView)
    |> render("_article_block.html", articles: articles, meta: meta, recomendations: [])
  end

  def show(conn, %{slug: slug}) do
    if tag = Repo.get_by(Tag, slug: slug) do
      %{entries: articles, metadata: meta} = do_query(slug) |> ES.search()

      render(conn, "show.html",
        articles: articles,
        meta: meta,
        tag: tag.name,
        recomendations: do_recomendations(meta, articles)
      )
    else
      conn
      |> put_view(BloomchainWeb.ErrorView)
      |> render("404.html")
    end
  end

  defp do_query(tag) do
    %{
      query: %{
        bool: %{
          filter: [
            %{term: %{status: "published"}},
            %{term: %{"tags.slug": tag}}
          ]
        }
      },
      size: 6,
      sort: [
        %{published_at: %{order: "desc"}},
        %{_id: "desc"}
      ]
    }
  end

  defp do_query(tag, scroll) do
    tag
    |> do_query()
    |> Map.merge(%{search_after: String.split(scroll, ";")})
  end

  defp do_recomendations(%{after: nil}, articles) do
    articles
    |> Enum.take(2)
    |> RecomendationPosts.run()
    |> Map.fetch!(:entries)
  end

  defp do_recomendations(_meta, _articles), do: []
end
