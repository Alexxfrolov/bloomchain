defmodule BloomchainWeb.Workflow.RecomendationPosts do
  alias Bloomchain.ElasticsearchCluster, as: ES

  @size 6

  def run([_ | _] = posts) do
    %{
      ids: Enum.map(posts, & &1.id),
      types: Enum.map(posts, & &1.id),
      tags: Enum.flat_map(posts, & &1.tags)
    }
    |> do_query()
    |> ES.search()
  end

  def run(post) do
    %{ids: [post.id], types: [post.type], tags: post.tags}
    |> do_query()
    |> ES.search()
  end

  def do_query(%{ids: ids, types: types, tags: tags}) do
    %{
      query: %{
        function_score: %{
          query: %{
            bool: %{
              must: %{match_all: %{}},
              filter: [%{term: %{status: "published"}}],
              must_not: [%{terms: %{id: ids}}]
            }
          },
          functions: date_functions() ++ type_functions(types) ++ tag_functions(tags),
          score_mode: "sum"
        }
      },
      size: @size
    }
  end

  defp date_functions do
    [
      %{
        weight: 4,
        gauss: %{
          published_at: %{
            scale: "3d",
            offset: "4h"
          }
        }
      },
      %{
        weight: 2,
        gauss: %{
          published_at: %{
            scale: "7d",
            offset: "1d"
          }
        }
      },
      %{
        weight: 1,
        gauss: %{
          published_at: %{
            scale: "14d",
            offset: "2d"
          }
        }
      }
    ]
  end

  defp type_functions(types) do
    types
    |> Enum.map(fn type ->
      %{
        filter: %{term: %{type: type}},
        weight: 4
      }
    end)
  end

  defp tag_functions([]), do: []

  defp tag_functions(tags) do
    weight = 12 / length(tags)

    Enum.map(tags, fn tag ->
      %{filter: %{term: %{"tags.slug": tag.slug}}, weight: weight}
    end)
  end
end
