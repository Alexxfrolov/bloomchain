import { request } from "@features/core"

import { OrderParams, Pagination, PaginationParams } from "../common"

export interface Subscriber {
  id: number
  email: string
  inserted_at: Date | string
}

type Params = OrderParams<Subscriber> & PaginationParams

function get(params: Params) {
  const { order, orderBy, ...restOptions } = params

  return request<{ data: Subscriber[]; meta: Pagination }>(
    "GET",
    "/subscribers",
    {
      params: {
        ...restOptions,
        sort_by: `${order}(${orderBy})`,
      },
    },
  )
}

export const subscribersApi = {
  get,
}
