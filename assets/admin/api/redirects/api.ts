import { request } from "@features/core"

import type { OrderParams, Pagination, PaginationParams } from "../common"

export interface Redirect {
  id: number
  path_from: string
  path_to: string
  inserted_at: Date | string
  updated_at: Date | string
}

type Params = Partial<OrderParams<Redirect>> & Partial<PaginationParams>

function get({
  orderDirection = "desc",
  orderBy = "inserted_at",
  page_size = 25,
  page = 1,
}: Params) {
  return request<{ data: Redirect[]; meta: Pagination }>("GET", "/redirects", {
    params: {
      page_size,
      page,
      sort_by: `${orderDirection}(${orderBy})`,
    },
  })
}

export const redirectsApi = {
  get,
}
