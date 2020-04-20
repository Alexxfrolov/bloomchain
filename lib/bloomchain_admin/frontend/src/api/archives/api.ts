import axios, { AxiosPromise } from "axios"
import { httpConfig } from "@features/core"

import { Order, Pagination } from "../types"

import { Archive } from "./types"

interface Params {
  order: Order
  orderBy: keyof Archive
  page_size: number
  page: number
}

function get(
  params: Params,
): AxiosPromise<{ data: Archive[]; meta: Pagination }> {
  const { order, orderBy, ...restOptions } = params

  return axios.get(`${httpConfig.baseUrl}/archives`, {
    params: {
      ...restOptions,
      sort_by: `${order}(${orderBy})`,
    },
  })
}

function create(cover_id: number, pdf_id: number): AxiosPromise<Archive> {
  return axios.post(`${httpConfig.baseUrl}/archives`, { cover_id, pdf_id })
}

function remove(id: number): AxiosPromise {
  return axios.delete(`${httpConfig.baseUrl}/archives/${id}`)
}

export const archivesApi = {
  get,
  create,
  remove,
}
