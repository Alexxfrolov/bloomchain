import { request } from "@features/core"

import { OrderParams, Pagination, PaginationParams } from "../common"

export interface Article {
  authors: import("../authors").Author[]
  body: string
  cover: import("../media").MediaFile | null
  inserted_at: Date | string | null
  id: number
  lead: string | null
  published_at: Date | string | null
  seo_settings: SeoSettings
  slug: string
  status: "published" | "draft" | "archive" | "ready"
  tags: import("../tags").Tag[]
  time: string | null
  title: string
  total_views: number
  type:
    | "newsfeed"
    | "detailed"
    | "analysis"
    | "in-russia"
    | "calendar"
    | "people"
    | "research"
  updated_at: Date | string | null
  url: string
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

type Params = Partial<OrderParams<Article>> &
  Partial<PaginationParams> & {
    status: Article["status"]
    type: Article["type"]
    since?: Date | string | null
    until?: Date | string | null
  }

function get({
  orderDirection = "desc",
  orderBy = "published_at",
  page_size = 25,
  page = 1,
  ...otherOptions
}: Params) {
  return request<{ data: Article[]; meta: Pagination }>("GET", "/articles", {
    params: {
      page_size,
      page,
      sort_by: `${orderDirection}(${orderBy})`,
      ...otherOptions,
    },
  })
}

function getById(id: number) {
  return request<Article>("GET", `articles/${id}`)
}

function create(article: Partial<Article>) {
  return request<Article>("POST", "/articles", { data: { ...article } })
}

function update(article: Partial<Article>) {
  return request<Article>("PATCH", `/articles/${article.id}`, {
    data: { ...article },
  })
}

function remove(id: number) {
  return request("DELETE", `/articles/${id}`)
}

interface SearchParams {
  status: Article["status"]
  type: Article["type"]
  query: string
}

function search(options: SearchParams) {
  return request<{ data: Article[] }>("GET", "/articles/search", {
    params: {
      ...options,
    },
  })
}

export const articlesApi = {
  search,
  get,
  getById,
  create,
  update,
  remove,
}
