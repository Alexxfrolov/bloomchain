import axios from "axios"
import decamelize from "decamelize"
import { httpConfig } from "@features/core"

function get(page?: number) {
  return axios.get(`${httpConfig.baseUrl}/tags`)
}

function create(name: string) {
  // const formData = new FormData()
  // Object.keys(tag).forEach((key) => formData.append(decamelize(key), tag[key]))

  // return fetch(`${httpConfig.baseUrl}/tags`, {
  //   method: "POST",
  //   mode: "no-cors",
  //   cache: "no-cache",
  //   credentials: "same-origin",
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   body: formData,
  // })

  return axios.post(`${httpConfig.baseUrl}/tags`, { name })
}

function update(id: number) {
  return fetch(`${httpConfig.baseUrl}/tags/${id}`, {
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
  return axios.delete(`${httpConfig.baseUrl}/tags/${id}`)
}

export const tagsAPI = {
  get,
  create,
  update,
  remove,
}
