alias Bloomchain.Repo
alias BloomchainWeb.Uploaders.File, as: Upload
alias Bloomchain.Content.{Post, Media}

make_paragraphs = fn item ->
  item
  |> String.split("\r\n")
  |> Enum.reject(&(String.trim(&1) == ""))
  |> Enum.map(&("<p>" <> &1 <> "</p>"))
  |> Enum.join()
  |> String.replace(
    ["[embed]", "[/embed]", "<p></p>", "<b></b>", "style=\"font-weight: 400;\""],
    ""
  )
end

replace_embedly_urls = fn item ->
  Regex.replace(
    ~r/<p>((https:\/\/twitter.com\/[a-z0-9_&=;\-\?\/]+)|(https:\/\/www.youtube.com\/watch\?v=[a-z0-9_&=;\-\?\/]+)|(https:\/\/youtu.be\/[a-z0-9_&=;\-\?\/]+))<\/p>/i,
    item,
    fn tag, _ ->
      url = Regex.run(~r/(?<=<p>)(.*?)(?=<\/p>)/, tag, capture: :first) |> List.first()
      "<a href=\"#{url}\" data-card-branding=\"0\" class=\"embedly-card\"></a>"
    end
  )
end

replace_bloomchain_urls = fn item ->
  item
  |> String.replace(["http://bloomchain.ru/", "https://bloomchain.ru/"], "/")
  |> String.replace("/wp-content/uploads/", "/uploads/wp-content/")
end

replace_caption = fn item ->
  Regex.replace(
    ~r/\[caption(.*?)\[\/caption\]/,
    item,
    fn tag, _ ->
      src = Regex.run(~r/(?<=src=\")(.*?)(?=\" )/, tag, capture: :first) |> List.first()
      width = Regex.run(~r/(?<=width=\")(.*?)(?=\"])/, tag, capture: :first) |> List.first()
      height = Regex.run(~r/(?<=height=\")(.*?)(?=\" )/, tag, capture: :first) |> List.first()
      alt = Regex.run(~r/(?<=alt=\")(.*?)(?=\" )/, tag, capture: :first) |> List.first()

      capture =
        Regex.replace(
          ~r/(\[caption (.*?)\])((<a (.*?)><img (.*?) \/><\/a>)|(<img (.*?) \/>))/,
          tag,
          ""
        )
        |> String.replace("[/caption]", "")
        |> String.trim()

      "<div class=\"fr-img-space-wrap\">\
<span contenteditable=\"false\" class=\"fr-img-caption fr-fic fr-dib\" draggable=\"false\">\
<span class=\"fr-img-wrap\">\
<img class=\"size-full wp-image-74087\" src=\"#{src}\" alt=\"#{alt}\" width=\"#{width}\" height=\"#{
        height
      }\" />\
<span class=\"fr-inner\">#{capture}</span>\
</span>\
</span>\
</div>"
    end
  )
end

replace_strong_tags = fn item ->
  Regex.replace(
    ~r/<h[0-9]{1,1}>(.*?)<\/h[0-9]>/,
    item,
    fn tag, _ ->
      tag
      |> String.replace(
        ["<span style=\"font-weight: 400\">", "<b>", "</b>", "<strong>", "</strong>"],
        ""
      )
    end
  )
end

replace_blockquote = fn item ->
  Regex.replace(
    ~r/<blockquote>(.*?)<\/blockquote>/,
    item,
    fn tag, _ ->
      data = String.replace(tag, ["<blockquote>", "</blockquote>"], "")

      "<blockquote><div class=\"blockqoute__inner\">#{data}</div></blockquote>"
    end
  )
end

replace_pdfs = fn item ->
  Regex.replace(
    ~r/http(s)?:\/\/bloomchain.ru\/([a-zа-я\d\.-]+)\.pdf/i,
    item,
    fn url, _ ->
      "/uploads/wp-content/pdf/" <> (Regex.run(~r/[^\/]*$/, url) |> List.first())
    end
  )
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

s3_urls = fn item, storage ->
  if storage == Arc.Storage.S3 do
    item
    |> String.replace(
      "/uploads/wp-content/",
      "https://#{System.get_env("AWS_BUCKET")}.s3.amazonaws.com/uploads/wp-content/"
    )
  else
    item
  end
end

"#{File.cwd!()}/priv/repo/seed/data_files/posts.json"
|> File.read!()
|> Poison.decode!(keys: :atoms)
|> Enum.map(fn item ->
  body =
    item.body
    |> make_paragraphs.()
    |> replace_pdfs.()
    |> replace_embedly_urls.()
    |> replace_bloomchain_urls.()
    |> replace_caption.()
    |> replace_strong_tags.()
    |> replace_blockquote.()
    |> s3_urls.(Application.get_env(:arc, :storage))

  Map.replace!(item, :body, body)
end)
|> Enum.each(fn item ->
  cover = persist_cover.(item.cover, item.cover_alt)

  cover_url =
    if cover.id do
      Upload.url({cover.file, cover})
    else
      ""
    end

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
      cover_id: cover.id,
      seo_settings: %{
        description: item.description,
        twitter_image: cover_url,
        og_image: cover_url
      }
    })
  )
end)

# update uniq primary id sequence after raw id insert
Ecto.Adapters.SQL.query!(Repo, "SELECT setval('posts_id_seq', (SELECT MAX(id) from posts))")
