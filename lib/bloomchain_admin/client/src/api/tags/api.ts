import { request } from "@features/core"

import { OrderParams, Pagination, PaginationParams } from "../common"

export interface Tag {
  inserted_at: Date | string
  deletable: boolean
  editable: boolean
  id: number
  name: string
  slug: string
  updated_at: Date | string
}

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
