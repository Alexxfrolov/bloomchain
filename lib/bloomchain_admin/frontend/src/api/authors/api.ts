import axios, { AxiosPromise } from "axios"
import { httpConfig } from "@features/core"

import { Order, Pagination } from "../types"

import { Author } from "./types"

interface Params {
  order: Order
  orderBy: keyof Author
  page_size: number
  page: number
}

function get(
  params: Params,
): AxiosPromise<{ data: Author[]; meta: Pagination }> {
  const { order, orderBy, ...restOptions } = params

  return axios.get(`${httpConfig.baseUrl}/authors`, {
    params: {
      ...restOptions,
      sort_by: `${order}(${orderBy})`,
    },
  })
}

function getAll(): AxiosPromise<{ data: Author[] }> {
  return axios.get(`${httpConfig.baseUrl}/authors`, {
    params: {
      page_size: "all",
    },
  })
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
  getAll,
  create,
  update,
  remove,
}
