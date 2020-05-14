defmodule BloomchainWeb.TagController do
  use BloomchainWeb, :controller

  alias Bloomchain.{Repo, Content.Tag}
  alias Bloomchain.ElasticsearchCluster, as: ES

  def show(conn, %{scroll: scroll}) do
    %{entries: articles, metadata: meta} = ES.scroll(scroll)

    conn
    |> put_resp_header("x-pagination-scroll", to_string(meta.after))
    |> put_layout(false)
    |> put_view(BloomchainWeb.SharedView)
    |> render("_article_block.html", articles: articles, meta: meta)
  end

  def show(conn, %{tag: tag}) do
    name = Repo.get_by!(Tag, slug: tag).name
    %{entries: articles, metadata: meta} = do_query(tag) |> ES.search(scroll: "5m")

    render(conn, "show.html", articles: articles, meta: meta, tag: name)
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
      sort: [%{published_at: %{order: "desc"}}],
      size: 6
    }
  end
end
