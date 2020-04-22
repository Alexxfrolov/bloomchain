import decamelize from "decamelize"
import { request } from "@features/core"

import { OrderParams, Pagination, PaginationParams } from "../common"

import { User } from "./types"

type Params = OrderParams<User> & PaginationParams

function get(params: Params) {
  const { order, orderBy, ...restOptions } = params

  return request<{ data: User[]; meta: Pagination }>("GET", "/users", {
    params: {
      ...restOptions,
      sort_by: `${order}(${orderBy})`,
    },
  })
}

function getById(id: number) {
  return request<User>("GET", `/users/${id}`)
}

function create(user: Partial<User>) {
  const formData = new FormData()
  Object.keys(user).forEach((key) =>
    formData.append(decamelize(key), user[key]),
  )

  return request("POST", "/users", {
    data: {
      ...user,
    },
  })
}

function update(user: User) {
  return request<User>("PATCH", `/users/${user.id}`)
}

function remove(id: number) {
  return request("DELETE", `/users/${id}`)
}

export const usersApi = {
  get,
  getById,
  create,
  update,
  remove,
}
