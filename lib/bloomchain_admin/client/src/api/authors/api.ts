import { request } from "@features/core"

import { OrderParams, Pagination, PaginationParams } from "../common"

export interface Author {
  inserted_at: Date
  deletable: boolean
  editable: boolean
  id: number
  name: string
  updated_at: Date
}

type Params = Partial<OrderParams<Author>> & Partial<PaginationParams>

function get({
  orderDirection = "desc",
  orderBy = "inserted_at",
  page_size = 25,
  page = 1,
}: Params) {
  return request<{ data: Author[]; meta: Pagination }>("GET", "/authors", {
    params: {
      page_size,
      page,
      sort_by: `${orderDirection}(${orderBy})`,
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
