import axios, { AxiosPromise } from "axios"
import decamelize from "decamelize"
import { httpConfig } from "@features/core"

import { User } from "./types"

function get(): AxiosPromise<{ data: User[] }> {
  return axios.get(`${httpConfig.baseUrl}/users`)
}

function getById(id: number): AxiosPromise<User> {
  return axios.get(`${httpConfig.baseUrl}/users/${id}`)
}

function create(user: Partial<User>) {
  const formData = new FormData()
  Object.keys(user).forEach((key) =>
    formData.append(decamelize(key), user[key]),
  )

  return axios.post(`${httpConfig.baseUrl}/users`, { ...user })
}

function update(user: User): AxiosPromise<User> {
  return axios.patch(`${httpConfig.baseUrl}/users/${user.id}`, user)
}

function remove(id: number): AxiosPromise {
  return axios.delete(`${httpConfig.baseUrl}/users/${id}`)
}

export const usersApi = {
  get,
  getById,
  create,
  update,
  remove,
}
