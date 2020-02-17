import decamelize from "decamelize"
import { httpConfig } from "@features/core"

function get() {
  return fetch(`${httpConfig.baseUrl}/article`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "json",
    },
  })
}

function create(article: import("./article.types").Article) {
  const formData = new FormData()
  Object.keys(article).forEach((key) => formData.append(decamelize(key), article[key]))

  return fetch(`${httpConfig.baseUrl}/article`, {
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

export const articleApi = {
  get,
  create,
}
