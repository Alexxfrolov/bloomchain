import { request } from "@features/core"

import { OrderParams, Pagination, PaginationParams } from "../common"

import { Article } from "./types"

type Params = OrderParams<Article> &
  PaginationParams & {
    status: Article["status"]
    type: Article["type"]
    since?: Date | null
    until?: Date | null
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
