alias Bloomchain.Repo
alias Bloomchain.Content.{Post, Article}

"#{File.cwd!()}/priv/repo/data_files/posts.json"
|> File.read!()
|> Poison.decode!(keys: :atoms)
|> Enum.each(fn item ->
  Repo.insert!(
    Post.changeset(%Post{}, %{
      id: item.id,
      title: item.title,
      slug: item.slug,
      lead: nil,
      type: item.type,
      body: item.body,
      status: "published",
      published_at: item.published_at,
      time: nil,
      cover_id: nil,
      tags: String.split(item.tags, ","),
      authors: [item.author_id],
      total_views: item.total_views,
      seo_settings: %{}
    })
  )
end)
