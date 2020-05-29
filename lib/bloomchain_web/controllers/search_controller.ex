defmodule BloomchainWeb.SearchController do
  use BloomchainWeb, :controller
  alias Bloomchain.ElasticsearchCluster, as: ES

  def index(conn, %{query: query}) do
    %{entries: articles, metadata: meta} = do_query(query) |> ES.search(scroll: "15m")

    render(conn, "index.html",
      articles: articles,
      meta: meta,
      query: query,
      title: "Вы искали - " <> query
    )
  end

  def index(conn, %{scroll: scroll}) do
    %{entries: articles, metadata: meta} = ES.scroll(scroll)

    conn
    |> put_resp_header("x-pagination-scroll", to_string(meta.after))
    |> put_layout(false)
    |> put_view(BloomchainWeb.SharedView)
    |> render("_article_block.html", articles: articles, meta: meta)
  end

  defp do_query(str) do
    %{
      query: %{
        bool: %{
          must: [
            %{
              multi_match: %{
                query: str,
                fields: ["title^3", "lead^2", "body"],
                tie_breaker: 0.1,
                type: "most_fields",
                fuzziness: "auto"
              }
            }
          ],
          filter: [
            %{term: %{status: "published"}}
          ]
        }
      },
      size: 6
    }
  end
end
