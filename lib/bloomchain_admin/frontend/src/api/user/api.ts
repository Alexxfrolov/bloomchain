import axios from "axios"
import decamelize from "decamelize"
import { httpConfig } from "@features/core"

function get() {
  return axios.get(`${httpConfig.baseUrl}/users`)
}

function getById(id: number) {
  return axios.get(`${httpConfig.baseUrl}/users/${id}`)
}

function create(user: any) {
  // const formData = new FormData()
  // Object.keys(tag).forEach((key) => formData.append(decamelize(key), tag[key]))

  // return fetch(`${httpConfig.baseUrl}/tags`, {
  //   method: "POST",
  //   mode: "no-cors",
  //   cache: "no-cache",
  //   credentials: "same-origin",
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   body: formData,
  // })

  return axios.post(`${httpConfig.baseUrl}/users`, { ...user })
}

function update(user: any) {
  return axios.patch(`${httpConfig.baseUrl}/users/${user.id}`, user)
}

function remove(id: number) {
  return axios.delete(`${httpConfig.baseUrl}/users/${id}`)
}

export const usersAPI = {
  get,
  getById,
  create,
  update,
  remove,
}
