import axios, { AxiosPromise } from "axios"
import { httpConfig } from "@features/core"

import { Order, Pagination } from "../types"

import { Article } from "./types"

interface Params {
  order: Order
  orderBy: keyof Article
  page_size: number
  page: number
  status: Article["status"]
  type: Article["type"]
  since?: Date | null
  until?: Date | null
}

function get(
  params: Params,
): AxiosPromise<{ data: Article[]; meta: Pagination }> {
  try {
    const { order, orderBy, ...restOptions } = params
    return axios(`${httpConfig.baseUrl}/articles`, {
      params: {
        ...restOptions,
        sort_by: `${order}(${orderBy})`,
      },
    })
  } catch (err) {
    throw new Error(err)
  }
}

function getById(id: number): AxiosPromise<Article> {
  return axios(`${httpConfig.baseUrl}/articles/${id}`)
}

function create(article: Omit<Article, "id">): AxiosPromise<Article> {
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
    return axios.post(`${httpConfig.baseUrl}/articles`, data)
  } catch (err) {
    throw new Error(err)
  }
}

function update(
  article: Omit<Article, "keywords"> & {
    keywords: string
  },
): AxiosPromise<Article> {
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
    return axios.patch(`${httpConfig.baseUrl}/articles/${article.id}`, data)
  } catch (err) {
    throw new Error(err)
  }
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
