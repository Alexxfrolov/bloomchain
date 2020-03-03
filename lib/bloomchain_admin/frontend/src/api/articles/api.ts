import axios, { AxiosPromise } from "axios"
import decamelize from "decamelize"
import { httpConfig } from "@features/core"

import { Article } from "./types"

function getLatest(
  status: Article["status"],
  type: Article["type"],
): AxiosPromise<{ data: Article[] }> {
  return axios(`${httpConfig.baseUrl}/articles?status=${status}&type=${type}`)
}

function getById(id: number): AxiosPromise<Article> {
  return axios(`${httpConfig.baseUrl}/articles/${id}`)
}

function create(
  article: Omit<Article, "createdAt" | "updatedAt" | "id" | "keywords"> & {
    cover_id: number
    keywords: string
  },
): AxiosPromise<Article> {
  const data = {
    ...article,
    keywords: article.keywords.split(/[ ,]+/),
    tags: article.tags.map((tag) => tag.id),
  }
  return axios.post(`${httpConfig.baseUrl}/articles`, data)
}

function update(article: Article): AxiosPromise<Article> {
  const data = {
    ...article,
    keywords: article.keywords.split(/[ ,]+/),
    tags: article.tags.map((tag) => tag.id),
  }
  return axios.patch(`${httpConfig.baseUrl}/articles/${article.id}`, data)
}

function remove(id: number): AxiosPromise {
  return axios.delete(`${httpConfig.baseUrl}/articles/${id}`)
}

export const articlesApi = {
  getLatest,
  getById,
  create,
  update,
  remove,
}
