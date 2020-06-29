defmodule BloomchainWeb.SearchController do
  use BloomchainWeb, :controller
  alias Bloomchain.ElasticsearchCluster, as: ES

  def index(conn, %{query: query, scroll: scroll}) do
    %{entries: articles, metadata: meta} = do_query(query, scroll) |> ES.search()

    conn
    |> put_resp_header("x-pagination-scroll", to_string(meta.after))
    |> put_layout(false)
    |> put_view(BloomchainWeb.SharedView)
    |> render("_article_block.html", articles: articles, meta: Map.merge(meta, %{query: query}))
  end

  def index(conn, %{query: query}) do
    %{entries: articles, metadata: meta} = do_query(query) |> ES.search()

    render(conn, "index.html",
      articles: articles,
      meta: Map.merge(meta, %{query: query}),
      query: query,
      title: "Вы искали - " <> query
    )
  end

  defp do_query(str) do
    %{
      query: %{
        function_score: %{
          query: %{
            bool: %{
              must: %{
                multi_match: %{
                  query: str,
                  fields: ["title^3", "lead^2", "body"],
                  type: "best_fields",
                  fuzziness: "auto"
                }
              },
              filter: [%{term: %{status: "published"}}]
            }
          },
          functions: [
            %{
              # The relevancy of old posts is multiplied by at least one.
              weight: 1
            },
            %{
              # Published this month get a big boost
              weight: 5,
              gauss: %{
                published_at: %{
                  scale: "3d",
                  decay: 0.5
                }
              }
            },
            %{
              # Published this month get a big boost
              weight: 4,
              gauss: %{
                published_at: %{
                  scale: "14d",
                  decay: 0.5
                }
              }
            },
            %{
              # Published this month get a big boost
              weight: 3,
              gauss: %{
                published_at: %{
                  scale: "31d",
                  decay: 0.5
                }
              }
            },
            %{
              # Published this year get a boost
              weight: 2,
              gauss: %{
                published_at: %{
                  scale: "100d",
                  decay: 0.5
                }
              }
            }
          ],
          # All functions outputs get summed
          score_mode: "sum",
          # The documents relevance is multiplied with the sum
          boost_mode: "multiply",
          min_score: 10
        }
      },
      size: 6,
      sort: [
        %{_score: "desc"},
        %{_id: "desc"}
      ]
    }
  end

  defp do_query(str, scroll) do
    do_query(str)
    |> Map.merge(%{search_after: String.split(scroll, ";")})
  end
end
