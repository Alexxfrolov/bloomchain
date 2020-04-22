import { request } from "@features/core"

import { OrderParams, Pagination, PaginationParams } from "../common"

import { Tag } from "./types"

type Params = OrderParams<Tag> & PaginationParams

function get(params: Params) {
  const { order, orderBy, ...restOptions } = params
  return request<{ data: Tag[]; meta: Pagination }>("GET", "/tags", {
    params: {
      ...restOptions,
      sort_by: `${order}(${orderBy})`,
    },
  })
}

function getAll() {
  return request<{ data: Tag[] }>("GET", "/tags")
}

function create(name: string) {
  return request<Tag>("POST", "/tags", {
    data: { name },
  })
}

function remove(id: number) {
  return request("DELETE", `/tags/${id}`)
}

export const tagsApi = {
  get,
  getAll,
  create,
  remove,
}
