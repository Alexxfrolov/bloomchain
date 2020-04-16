defimpl Elasticsearch.Document, for: Bloomchain.Content.Post do
  def id(post), do: post.id
  def routing(_), do: false

  def encode(post) do
    %{
      id: post.id,
      slug: post.slug,
      title: post.title,
      body: post.body,
      lead: post.lead,
      type: post.type,
      status: post.status,
      time: post.time,
      total_views: post.total_views,
      published_at: post.published_at,
      inserted_at: post.inserted_at,
      updated_at: post.updated_at,
      cover: do_cover(post),
      authors: do_authors(post),
      tags: do_tags(post),
      seo_settings: post.seo_settings
    }
  end

  defp do_cover(%{cover: nil}), do: nil

  defp do_cover(%{cover: cover}) do
    %{
      id: cover.id,
      uuid: cover.uuid,
      inserted_at: cover.inserted_at,
      type: cover.type,
      title: cover.title,
      updated_at: cover.updated_at,
      source: cover.source,
      content_type: cover.content_type,
      file: cover.file
    }
  end

  defp do_authors(%{authors: nil}), do: nil

  defp do_authors(%{authors: authors}) do
    Enum.map(authors, fn author ->
      %{
        id: author.id,
        name: author.name
      }
    end)
  end

  defp do_tags(%{tags: nil}), do: nil

  defp do_tags(%{tags: tags}) do
    Enum.map(tags, fn tag ->
      %{
        id: tag.id,
        slug: tag.slug,
        name: tag.name
      }
    end)
  end
end
