import axois, { AxiosPromise } from "axios"
import { httpConfig } from "@features/core"

import { Order, Pagination } from "../types"

import { Subscriber } from "./types"

interface Params {
  order: Order
  orderBy: keyof Subscriber
  page_size: number
  page: number
}

function get(
  params: Params,
): AxiosPromise<{ data: Subscriber[]; meta: Pagination }> {
  const { order, orderBy, ...restOptions } = params

  return axois.get(`${httpConfig.baseUrl}/subscribers`, {
    params: {
      ...restOptions,
      sort_by: `${order}(${orderBy})`,
    },
  })
}

export const subscribersApi = {
  get,
}
