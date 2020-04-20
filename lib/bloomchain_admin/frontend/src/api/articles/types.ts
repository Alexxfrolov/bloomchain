export interface Article {
  authors: import("../authors").Author[]
  body: string | null
  cover: import("../media").MediaFile | null
  inserted_at: Date | null
  id: number
  lead: string | null
  published_at: Date | null
  seo_settings: SeoSettings
  status: "published" | "draft" | "archive" | "ready"
  tags: import("../tags").Tag[]
  time: string | null
  title: string
  total_views: number
  type:
    | "newsfeed"
    | "detailed"
    | "analysis"
    | "in_russia"
    | "calendar"
    | "person"
    | "research"
  updated_at: Date | null
  url?: string | null
}

export interface SeoSettings {
  keywords: string[]
  description: string | null
  og_site_name?: string
  og_url?: string
  og_type:
    | "music.song"
    | "music.album"
    | "music.playlist"
    | "music.radio_station"
    | "video.movie"
    | "video.episode"
    | "video.tv_show"
    | "video.other"
    | "article"
    | "book"
    | "profile"
    | "website"
  og_title: string | null
  og_description: string | null
  og_image: string | null
  og_image_alt?: string
  og_image_width?: string
  og_image_height?: string
  og_locale?: string
  og_locale_alternate?: string
  article_published_time?: Date | string // format ISO 8601
  article_modified_time?: Date | string // format ISO 8601
  article_expiration_time?: Date | string // format ISO 8601
  article_author?: string
  article_section?: string // E.g. Cryptocurrency
  article_tag?: string
  book_author?: string
  book_isbn?: string
  book_release_date?: string
  book_tag?: string
  profile_first_name?: string
  profile_last_name?: string
  profile_username?: string
  profile_gender?: string
  twitter_card?: "summary" | "summary_large_image" | "app" | "player"
  twitter_title?: string
  twitter_description?: string
  twitter_image?: string
}
