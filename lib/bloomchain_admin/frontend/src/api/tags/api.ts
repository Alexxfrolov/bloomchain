import axios, { AxiosPromise } from "axios"
// import decamelize from "decamelize"
import { httpConfig } from "@features/core"

import { Tag } from "./types"

function get(): AxiosPromise<{ data: Tag[] }> {
  return axios.get(`${httpConfig.baseUrl}/tags`)
}

function create(name: string): AxiosPromise<Tag> {
  return axios.post(`${httpConfig.baseUrl}/tags`, { name })
}

function update(tag: Tag): AxiosPromise<Tag> {
  return axios.patch(`${httpConfig.baseUrl}/tags/${tag.id}`, tag)
}

function remove(id: number): AxiosPromise {
  return axios.delete(`${httpConfig.baseUrl}/tags/${id}`)
}

export const tagsAPI = {
  get,
  create,
  update,
  remove,
}
