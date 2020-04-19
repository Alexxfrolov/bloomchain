import axios, { AxiosPromise } from "axios"
import { httpConfig } from "@features/core"

import { Article } from "./types"

type Order = "asc" | "desc"

interface Options {
  order: Order
  orderBy: keyof Article
  page_size: number
  page: number
  status: Article["status"]
  type: Article["type"]
  since?: Date | null
  until?: Date | null
}

interface Pagination {
  page: number
  page_size: number
  total_items: number
  total_pages: number
}

function get(
  options: Options,
): AxiosPromise<{ data: Article[]; meta: Pagination }> {
  const { order, orderBy, ...restOptions } = options
  return axios(`${httpConfig.baseUrl}/articles`, {
    params: {
      ...restOptions,
      sort_by: `${order}(${orderBy})`,
    },
  })
}

function getById(id: number): AxiosPromise<Article> {
  return axios(`${httpConfig.baseUrl}/articles/${id}`)
}

function create(article: Omit<Article, "id">): AxiosPromise<Article> {
  const { tags, authors, keywords, cover, ...rest } = article
  const data = {
    ...rest,
    cover_id: cover?.id ?? null,
    authors: authors.reduce((acc: number[], author) => [...acc, author.id], []),
    tags: tags.reduce((acc: number[], tag) => [...acc, tag.id], []),
    keywords: keywords.length ? keywords.split(/[ ,]+/) : [],
  }
  return axios.post(`${httpConfig.baseUrl}/articles`, data)
}

function update(
  article: Omit<Article, "keywords"> & {
    keywords: string
  },
): AxiosPromise<Article> {
  const { cover, tags, keywords, authors, ...rest } = article
  const data = {
    ...rest,
    authors: authors.reduce((acc: number[], author) => [...acc, author.id], []),
    tags: tags.reduce((acc: number[], tag) => [...acc, tag.id], []),
    keywords: keywords.length ? keywords.split(/[ ,]+/) : [],
    cover_id: cover?.id ?? null,
  }
  return axios.patch(`${httpConfig.baseUrl}/articles/${article.id}`, data)
}

function remove(id: number): AxiosPromise {
  return axios.delete(`${httpConfig.baseUrl}/articles/${id}`)
}

interface SearchParams {
  status: Article["status"]
  type: Article["type"]
  query: string
}

function search(options: SearchParams) {
  return axios.get(`${httpConfig.baseUrl}/articles/search`, {
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
