import { request } from "@features/core"

import { OrderParams, Pagination, PaginationParams } from "../common"

import { Author } from "./types"

type Params = OrderParams<Author> & PaginationParams

function get(params: Params) {
  const { order, orderBy, ...restOptions } = params

  return request<{ data: Author[]; meta: Pagination }>("GET", "/authors", {
    params: {
      ...restOptions,
      sort_by: `${order}(${orderBy})`,
    },
  })
}

function getAll() {
  return request<{ data: Author[] }>("GET", "/authors")
}

function create(name: string) {
  return request("POST", "/authors", {
    data: { name },
  })
}

function update(author: Author) {
  return request<Author>("PATCH", `/authors/${author.id}`, {
    data: {
      ...author,
    },
  })
}

function remove(id: number) {
  return request<Author>("DELETE", `/authors/${id}`)
}

export const authorsApi = {
  get,
  getAll,
  create,
  update,
  remove,
}
