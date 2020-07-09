import { request } from "@features/core"

import { OrderParams, Pagination, PaginationParams } from "../common"

export interface Archive {
  cover: import("../media").MediaFile
  inserted_at: string
  id: number
  pdf: import("../media").MediaFile
  update_at: string | null
}

type Params = Partial<OrderParams<Archive>> & Partial<PaginationParams>

function get({
  orderDirection = "desc",
  orderBy = "inserted_at",
  page_size = 25,
  page = 1,
}: Params) {
  return request<{ data: Archive[]; meta: Pagination }>("GET", "/archives", {
    params: {
      page,
      page_size,
      sort_by: `${orderDirection}(${orderBy})`,
    },
  })
}

function create(cover_id: number, pdf_id: number) {
  return request<Archive>("POST", "/archives", {
    data: { cover_id, pdf_id },
  })
}

interface UpdateArchiveData {
  id: number
  cover_id?: number
  pdf_id?: number
}

function update(data: UpdateArchiveData) {
  return request<Archive>("PATCH", `/archives/${data.id}`, {
    data: { ...data },
  })
}

function remove(id: number) {
  return request("DELETE", `/archives/${id}`)
}

export const archivesApi = {
  get,
  create,
  update,
  remove,
}
