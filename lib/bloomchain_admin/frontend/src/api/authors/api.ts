import axios, { AxiosPromise } from "axios"
import { httpConfig } from "@features/core"

import { Author } from "./types"

function get(): AxiosPromise<{ data: Author[] }> {
  return axios.get(`${httpConfig.baseUrl}/authors`)
}

function create(name: string) {
  return axios.post(`${httpConfig.baseUrl}/authors`, { name })
}

function update(author: Author): AxiosPromise<Author> {
  return axios.patch(`${httpConfig.baseUrl}/authors/${author.id}`, author)
}

function remove(id: number): AxiosPromise<Author> {
  return axios.delete(`${httpConfig.baseUrl}/authors/${id}`)
}

export const authorsApi = {
  get,
  create,
  update,
  remove,
}
