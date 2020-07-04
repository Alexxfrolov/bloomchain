defmodule BloomchainWeb.TagController do
  use BloomchainWeb, :controller

  alias Bloomchain.{Repo, Content.Tag}
  alias Bloomchain.ElasticsearchCluster, as: ES
  alias BloomchainWeb.Workflow.RecomendationPosts

  def show(conn, %{tag: tag, scroll: scroll}) do
    %{entries: articles, metadata: meta} = do_query(tag, scroll) |> ES.search()

    conn
    |> put_resp_header("x-pagination-scroll", to_string(meta.after))
    |> put_layout(false)
    |> put_view(BloomchainWeb.SharedView)
    |> render("_article_block.html", articles: articles, meta: meta, recomendations: [])
  end

  def show(conn, %{tag: tag}) do
    name = Repo.get_by!(Tag, slug: tag).name
    %{entries: articles, metadata: meta} = do_query(tag) |> ES.search()

    render(conn, "show.html",
      articles: articles,
      meta: meta,
      tag: name,
      recomendations: do_recomendations(meta, articles)
    )
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
