import decamelize from "decamelize"
import { request } from "@features/core"

import { OrderParams, Pagination, PaginationParams } from "../common"

export interface User {
  email: string
  first_name: string
  id: number
  inserted_at: Date | string
  job: string | null
  last_name: string
  password: string | null
  phone: string | null
  role: "admin" | "writer"
  updated_at: Date | string
  editable: boolean
  deletable: boolean
}

const getCurrentUser = () => request<User>("GET", "/users/current")

type Params = OrderParams<User> & PaginationParams

function get({
  orderDirection = "desc",
  orderBy = "inserted_at",
  page_size = 25,
  page = 1,
}: Params) {
  return request<{ data: User[]; meta: Pagination }>("GET", "/users", {
    params: {
      page_size,
      page,
      sort_by: `${orderDirection}(${orderBy})`,
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

  return request<User>("POST", "/users", {
    data: {
      ...user,
    },
  })
}

function update(user: User) {
  return request<User>("PATCH", `/users/${user.id}`, {
    data: {
      ...user,
    },
  })
}

function remove(id: number) {
  return request("DELETE", `/users/${id}`)
}

export const usersApi = {
  getCurrentUser,
  get,
  getById,
  create,
  update,
  remove,
}
