export const ARTICLE_STATUSES_RECORD: Record<
  import("@api/articles").Article["status"],
  string
> = {
  draft: "Черновик",
  ready: "Готово к публикации",
  published: "Опубликовано",
  archive: "Архив",
}

export const ARTICLE_TYPES: import("@api/articles").Article["type"][] = [
  "newsfeed",
  "detailed",
  "analysis",
  "in-russia",
  "calendar",
  "people",
  "research",
]

export const ARTICLE_OG_TYPES: import("@api/articles").SeoSettings["og_type"][] = [
  "music.song",
  "music.album",
  "music.playlist",
  "music.radio_station",
  "video.movie",
  "video.episode",
  "video.tv_show",
  "video.other",
  "article",
  "book",
  "profile",
  "website",
]
