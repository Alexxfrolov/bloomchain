import decamelize from "decamelize"
import { httpConfig } from "@features/core"

function get() {
  return fetch(`${httpConfig.baseUrl}/articles`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

function create(
  article: Omit<import("./types").Article, "createdAt" | "updatedAt">,
) {
  const formData = new FormData()
  Object.keys(article).forEach((key) =>
    formData.append(decamelize(key), article[key]),
  )

  return fetch(`${httpConfig.baseUrl}/articles`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  })
}

function update(id: number) {
  return fetch(`${httpConfig.baseUrl}/articles/${id}`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const articlesAPI = {
  get,
  create,
  update,
}
