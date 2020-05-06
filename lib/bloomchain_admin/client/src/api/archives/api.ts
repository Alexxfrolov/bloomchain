import { request } from "@features/core"

import { OrderParams, Pagination, PaginationParams } from "../common"

export interface Archive {
  cover: import("../media").MediaFile
  inserted_at: string
  id: number
  pdf: import("../media").MediaFile
  update_at: string | null
}

type Params = OrderParams<Archive> & PaginationParams

function get(params: Params) {
  const { order, orderBy, ...restOptions } = params

  return request<{ data: Archive[]; meta: Pagination }>("GET", "/archives", {
    params: {
      ...restOptions,
      sort_by: `${order}(${orderBy})`,
    },
  })
}

function create(cover_id: number, pdf_id: number) {
  return request<Archive>("POST", "/archives", {
    data: { cover_id, pdf_id },
  })
}

function remove(id: number) {
  return request("DELETE", `/archives/${id}`)
}

export const archivesApi = {
  get,
  create,
  remove,
}