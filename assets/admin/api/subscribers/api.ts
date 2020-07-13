import { request } from "@features/core"

import type { OrderParams, Pagination, PaginationParams } from "../common"

export interface Subscriber {
  id: number
  email: string
  inserted_at: Date | string
}

type Params = Partial<OrderParams<Subscriber>> & Partial<PaginationParams>

function get({
  orderDirection = "desc",
  orderBy = "inserted_at",
  page_size = 25,
  page = 1,
}: Params) {
  return request<{ data: Subscriber[]; meta: Pagination }>(
    "GET",
    "/subscribers",
    {
      params: {
        page_size,
        page,
        sort_by: `${orderDirection}(${orderBy})`,
      },
    },
  )
}

export const subscribersApi = {
  get,
}
