import { request } from "@features/core"

import { OrderParams, Pagination, PaginationParams } from "../common"

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

type Params = OrderParams<Article> &
  PaginationParams & {
    status: Article["status"]
    type: Article["type"]
    since?: Date | string | null
    until?: Date | string | null
  }

function get(params: Params) {
  const { order, orderBy, ...restOptions } = params
  return request<{ data: Article[]; meta: Pagination }>("GET", "/articles", {
    params: {
      ...restOptions,
      sort_by: `${order}(${orderBy})`,
    },
  })
}

function getById(id: number) {
  return request<Article>("GET", `articles/${id}`)
}

function create(article: Omit<Article, "id">) {
  try {
    const { tags, authors, seo_settings, cover, ...rest } = article
    const data = {
      ...rest,
      cover_id: cover?.id ?? null,
      authors: authors.reduce<number[]>(
        (acc, author) => [...acc, author.id],
        [],
      ),
      tags: tags.reduce<number[]>((acc, tag) => [...acc, tag.id], []),
      seo_settings: {
        ...seo_settings,
        keywords: seo_settings.keywords.length
          ? seo_settings.keywords.split(/[ ,]+/)
          : [],
      },
    }
    return request<Article>("POST", "/articles", { data })
  } catch (err) {
    throw new Error(err)
  }
}

function update(
  article: Omit<Article, "keywords"> & {
    keywords: string
  },
) {
  try {
    const { cover, tags, seo_settings, authors, ...rest } = article
    const data = {
      ...rest,
      authors: authors.reduce<number[]>(
        (acc, author) => [...acc, author.id],
        [],
      ),
      tags: tags.reduce<number[]>((acc, tag) => [...acc, tag.id], []),
      cover_id: cover?.id ?? null,
      seo_settings: {
        ...seo_settings,
        keywords: seo_settings.keywords.length
          ? seo_settings.keywords.split(/[ ,]+/)
          : [],
      },
    }
    return request<Article>("PATCH", `/articles/${article.id}`, { data })
  } catch (err) {
    throw new Error(err)
  }
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
  return request("GET", "/articles/search", {
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
