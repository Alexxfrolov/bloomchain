import axios from "axios"
import decamelize from "decamelize"
import { httpConfig } from "@features/core"

import { Article } from "./types"

function getLatest(status: Article["status"], type: Article["type"]) {
  return axios(`${httpConfig.baseUrl}/articles?status=${status}&type=${type}`)
}

function getById(id: number) {
  return axios(`${httpConfig.baseUrl}/articles/${id}`)
}

function create(article: Omit<Article, "createdAt" | "updatedAt" | "id">) {
  const formData = new FormData()
  Object.keys(article).forEach((key) =>
    formData.append(decamelize(key), article[key]),
  )
  formData.set("tags", JSON.stringify(article.tags.map((tag) => tag.id)))
  return axios.post(`${httpConfig.baseUrl}/articles`, formData)
}

function update(article: Article) {
  return axios.patch(`${httpConfig.baseUrl}/articles/${article.id}`, article)
}

function remove(id: number) {
  return axios.delete(`${httpConfig.baseUrl}/articles/${id}`)
}

export const articlesAPI = {
  getLatest,
  getById,
  create,
  update,
  remove,
}
