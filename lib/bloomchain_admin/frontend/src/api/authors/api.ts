import axios, { AxiosPromise } from "axios"
import { httpConfig } from "@features/core"

import { Author } from "./types"

function getLatest(): AxiosPromise<{ data: Author[] }> {
  return axios.get(`${httpConfig.baseUrl}/authors`)
}

function create(author: Partial<Author>) {
  return axios.post(`${httpConfig.baseUrl}/authors`, { ...author })
}

function update(author: Author): AxiosPromise<Author> {
  return axios.patch(`${httpConfig.baseUrl}/authors/${author.id}`, author)
}

function remove(id: number): AxiosPromise<Author> {
  return axios.delete(`${httpConfig.baseUrl}/authors/${id}`)
}

export const authorsApi = {
  getLatest,
  create,
  update,
  remove,
}
