import axios, { AxiosPromise } from "axios"
import { httpConfig } from "@features/core"

import { Order, Pagination } from "../types"

import { Tag } from "./types"

interface Params {
  order: Order
  orderBy: keyof Tag
  page_size: number
  page: number
}

function get(params: Params): AxiosPromise<{ data: Tag[]; meta: Pagination }> {
  const { order, orderBy, ...restOptions } = params
  return axios.get(`${httpConfig.baseUrl}/tags`, {
    params: {
      ...restOptions,
      sort_by: `${order}(${orderBy})`,
    },
  })
}

function getAll(): AxiosPromise<{ data: Tag[] }> {
  return axios.get(`${httpConfig.baseUrl}/tags`, {
    params: {
      page_size: "all",
    },
  })
}

function create(name: string): AxiosPromise<Tag> {
  return axios.post(`${httpConfig.baseUrl}/tags`, { name })
}

function remove(id: number): AxiosPromise {
  return axios.delete(`${httpConfig.baseUrl}/tags/${id}`)
}

export const tagsApi = {
  get,
  getAll,
  create,
  remove,
}
