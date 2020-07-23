defmodule BloomchainWeb.SearchController do
  use BloomchainWeb, :controller
  alias Bloomchain.ElasticsearchCluster, as: ES
  alias BloomchainWeb.Workflow.RecomendationPosts

  @size 6

  @size 6

  def index(conn, %{query: query, scroll: scroll}) do
    %{entries: articles, metadata: meta} = do_query(query, scroll) |> ES.search()

    conn
    |> put_resp_header("x-pagination-scroll", to_string(meta.after))
    |> put_layout(false)
    |> put_view(BloomchainWeb.SharedView)
    |> render("_article_block.html",
      articles: articles,
      meta: Map.merge(meta, %{query: query}),
      recomendations: []
    )
  end

  def index(conn, %{query: query}) do
    %{entries: articles, metadata: meta} = do_query(query) |> ES.search()

    render(conn, "index.html",
      articles: articles,
      meta: Map.merge(meta, %{query: query}),
      query: query,
      title: "Вы искали - " <> query,
      recomendations: do_recomendations(meta, articles)
    )
  end

  defp do_query(str) do
    %{
      query: %{
        function_score: %{
          query: %{
            bool: %{
              must: [
                %{
                  multi_match: %{
                    query: str,
                    fields: [
                      "tags.name^4",
                      "title^3",
                      "translit_titles^3",
                      "lead^3",
                      "body"
                    ],
                    type: "best_fields",
                    # tie_breaker: 0.3,
                    operator: "and",
                    fuzziness: "auto"
                  }
                }
              ],
              must_not: [],
              filter: [%{term: %{status: "published"}}]
            }
          },
          functions: [
            %{
              # Default weith for multiply
              weight: 1
            },
            %{
              # Published 3 days get a big boost
              weight: 8,
              gauss: %{
                published_at: %{
                  scale: "3d",
                  decay: 0.5
                }
              }
            },
            %{
              # Published 1 weeek get a big boost
              weight: 6,
              gauss: %{
                published_at: %{
                  scale: "7d",
                  decay: 0.5
                }
              }
            },
            %{
              # Published 2 weeks get a  boost
              weight: 5,
              gauss: %{
                published_at: %{
                  scale: "14d",
                  decay: 0.5
                }
              }
            },
            %{
              # Published this month get a boost
              weight: 4,
              gauss: %{
                published_at: %{
                  scale: "31d",
                  decay: 0.5
                }
              }
            },
            %{
              # Published this 2 months get a boost
              weight: 3,
              gauss: %{
                published_at: %{
                  scale: "70d",
                  decay: 0.5
                }
              }
            },
            %{
              # Published 3 months get a boost
              weight: 2,
              gauss: %{
                published_at: %{
                  scale: "100d",
                  decay: 0.5
                }
              }
            },
            %{
              # Published this year
              weight: 1.5,
              gauss: %{
                published_at: %{
                  scale: "365d",
                  decay: 0.5
                }
              }
            }
          ],
          # All functions outputs get summed
          score_mode: "max",
          # The documents relevance is multiplied with the sum
          boost_mode: "multiply"
        }
      },
      size: @size,
      sort: [
        %{_score: "desc"},
        %{_id: "desc"}
      ]
    }
  end

  defp do_query(str, scroll) do
    [score, id] = String.split(scroll, ";")
    must_not = %{term: %{id: id}}

    str
    |> do_query()
    |> update_in([:query, :function_score, :query, :bool, :must_not], &[must_not | &1])
    |> Map.merge(%{search_after: [score, id]})
  end

  defp do_recomendations(%{after: nil}, articles) do
    articles
    |> Enum.take(2)
    |> RecomendationPosts.run()
    |> Map.fetch!(:entries)
  end

  defp do_recomendations(_meta, _articles), do: []
end
