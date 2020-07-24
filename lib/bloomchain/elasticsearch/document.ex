defimpl Elasticsearch.Document, for: Bloomchain.Content.Post do
  def id(post), do: post.id
  def routing(_), do: false

  def encode(post) do
    %{
      id: post.id,
      slug: post.slug,
      title: post.title,
      translit_titles: Translit.transliterate(post.title),
      body: post.body,
      lead: post.lead,
      type: post.type,
      status: post.status,
      time: post.time,
      total_views: post.total_views,
      cover: do_cover(post),
      authors: do_authors(post),
      tags: do_tags(post),
      seo_settings: post.seo_settings,
      published_at: post.published_at,
      inserted_at: post.inserted_at,
      updated_at: post.updated_at
    }
  end

  defp do_cover(%{cover: nil}), do: nil

  defp do_cover(%{cover: cover}) do
    %{
      id: cover.id,
      uuid: cover.uuid,
      type: cover.type,
      title: cover.title,
      source: cover.source,
      content_type: cover.content_type,
      file: cover.file,
      alt: cover.alt,
      reloaded: cover.reloaded,
      inserted_at: cover.inserted_at,
      updated_at: cover.updated_at
    }
  end

  defp do_authors(%{authors: nil}), do: nil

  defp do_authors(%{authors: authors}) do
    Enum.map(authors, fn author ->
      %{
        id: author.id,
        name: author.name,
        inserted_at: author.inserted_at,
        updated_at: author.updated_at
      }
    end)
  end

  defp do_tags(%{tags: nil}), do: nil

  defp do_tags(%{tags: tags}) do
    Enum.map(tags, fn tag ->
      %{
        id: tag.id,
        slug: tag.slug,
        name: tag.name,
        inserted_at: tag.inserted_at,
        updated_at: tag.updated_at
      }
    end)
  end
end
