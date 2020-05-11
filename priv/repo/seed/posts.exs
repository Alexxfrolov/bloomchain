alias Bloomchain.Repo
alias Bloomchain.Content.{Post, Media}

make_paragraphs = fn item ->
  item
  |> String.split("\r\n")
  |> Enum.reject(&(String.trim(&1) == ""))
  |> Enum.map(&("<p>" <> &1 <> "</p>"))
  |> Enum.join()
  |> String.replace("<p><blockquote>", "<blockquote><p>")
  |> String.replace("</blockquote></p>", "</p></blockquote>")
end

replace_embedly_urls = fn item ->
  Regex.replace(
    ~r/(https:\/\/twitter.com\/.*s=20)|(https:\/\/www.youtube.com\/watch\?v=[a-zA-Z0-9]*)/,
    item,
    fn url, _ ->
      "<div class=\"fr-embedly\" data-original-embed=\"<a href='#{url}\" data-card-branding=\"0\" class=\"embedly-card\"></a><a href=\"#{
        url
      }\" data-card-branding=\"0\" class=\"embedly-card\"></a></div>"
    end
  )
end

replace_bloomchain_urls = fn item ->
  item
  |> String.replace("https://bloomchain.ru/", "/")
  |> String.replace("/wp-content/uploads/", "/uploads/wp-content/")
end

persist_cover = fn cover, alt ->
  path =
    File.cwd!() <>
      "/uploads/wp-content/" <>
      (Regex.run(~r/(?<=wp-content\/uploads\/)(.*?)$/, cover, capture: :first)
       |> List.first())

  case Repo.insert(
         Media.changeset(%Media{}, %{
           type: "image",
           alt: alt,
           file: %Plug.Upload{
             content_type: MIME.from_path(path),
             filename: Path.basename(path),
             path: path
           }
         })
       ) do
    {:ok, item} -> item
    {:error, _} -> %{id: nil}
  end
end

replace_caption = fn item ->
  Regex.replace(
    ~r/\[caption(.*?)\[\/caption\]/,
    item,
    fn tag, _ ->
      src = Regex.run(~r/(?<=src=\")(.*?)(?=\" )/, tag, capture: :first) |> List.first()
      alt = Regex.run(~r/(?<=alt=\")(.*?)(?=\" )/, tag, capture: :first) |> List.first()
      width = Regex.run(~r/(?<=width=\")(.*?)(?=\"])/, tag, capture: :first) |> List.first()
      height = Regex.run(~r/(?<=height=\")(.*?)(?=\" )/, tag, capture: :first) |> List.first()
      capture = Regex.run(~r/[^>]*$/, tag) |> List.first() |> String.replace("[/caption]", "")

      "<div class=\"fr-img-space-wrap\">\
          <span class=\"fr-img-caption fr-fic fr-dib\">\
             <span class=\"fr-img-wrap\">\
               <img class=\"size-full wp-image-74087\" src=#{src} alt=#{alt} width=#{width} height=#{
        height
      } />\
               <span class=\"fr-inner\">#{capture}</span>\
             </span>\
           </span>\
        </div>"
    end
  )
end

"#{File.cwd!()}/priv/repo/data_files/posts.json"
|> File.read!()
|> Poison.decode!(keys: :atoms)
|> Enum.map(fn item ->
  body =
    item.body
    |> make_paragraphs.()
    |> replace_embedly_urls.()
    |> replace_bloomchain_urls.()
    |> replace_caption.()

  Map.replace!(item, :body, body)
end)
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
      tags: String.split(item.tags, ","),
      authors: [item.author_id],
      total_views: item.total_views,
      cover_id: persist_cover.(item.cover, item.cover_alt).id,
      seo_settings: %{description: item.description}
    })
  )
end)

# update uniq primary id sequence after raw id insert
Ecto.Adapters.SQL.query!(Repo, "SELECT setval('posts_id_seq', (SELECT MAX(id) from posts))")
