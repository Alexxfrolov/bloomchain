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

type Params = Partial<OrderParams<Tag>> & Partial<PaginationParams>

function get({
  orderDirection = "desc",
  orderBy = "inserted_at",
  page_size = 25,
  page = 1,
}: Params) {
  return request<{ data: Tag[]; meta: Pagination }>("GET", "/tags", {
    params: {
      page_size,
      page,
      sort_by: `${orderDirection}(${orderBy})`,
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
