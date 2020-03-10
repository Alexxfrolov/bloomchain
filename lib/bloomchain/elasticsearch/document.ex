defimpl Elasticsearch.Document, for: Bloomchain.Content.Post do
  alias BloomchainWeb.Uploaders.File

  def id(post), do: post.id
  def routing(_), do: false

  def encode(post) do
    %{
      # search fields
      title: post.title,
      lead: post.lead,
      body: post.body,
      status: post.status,
      type: post.type,
      # data fields
      url: do_url(post),
      authors: do_authors(post),
      time: post.time,
      published_at: post.published_at,
      total_views: post.total_views,
      cover: do_cover(post)
    }
  end

  defp do_cover(%{cover: nil}) do
    %{
      url: nil
    }
  end

  defp do_cover(%{cover: cover}) do
    %{
      url: File.url({cover.file, cover})
    }
  end

  defp do_authors(%{authors: nil}) do
    []
  end

  defp do_authors(%{authors: authors}) do
    authors |> Enum.map(fn i -> i.name end)
  end

  defp do_url(item) do
    case item.type do
      "person" -> "/people/#{item.slug}"
      "in_russia" -> "/in-russia/#{item.slug}"
      _ -> "/#{item.type}/#{item.slug}"
    end
  end
end
