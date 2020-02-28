import axios, { AxiosPromise } from "axios"
import decamelize from "decamelize"
import { httpConfig } from "@features/core"

function get() {
  return axios.get(`${httpConfig.baseUrl}/media`)
}

function create(file: {
  image: File
  title: string
  alt: string
  source: string
}): AxiosPromise<import("./types").Media> {
  const formData = new FormData()
  Object.keys(file).forEach((key) =>
    formData.append(decamelize(key), file[key]),
  )

  return axios.post(`${httpConfig.baseUrl}/media`, formData)
}

function update(id: number) {
  return fetch(`${httpConfig.baseUrl}/media/${id}`, {
    method: "PATCH",
    mode: "no-cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

function remove(id: number) {
  return axios.delete(`${httpConfig.baseUrl}/media/${id}`)
}

export const mediaAPI = {
  get,
  create,
  update,
  remove,
}
