import axios, { AxiosPromise } from "axios"
// import decamelize from "decamelize"
import { httpConfig } from "@features/core"

import { Archive } from "./types"

function getLatest(): AxiosPromise<{ data: Archive[] }> {
  return axios.get(`${httpConfig.baseUrl}/archives`)
}

function create(name: string): AxiosPromise<Archive> {
  return axios.post(`${httpConfig.baseUrl}/archives`, { name })
}

function update(archive: Archive): AxiosPromise<Archive> {
  return axios.patch(`${httpConfig.baseUrl}/archives/${archive.id}`, archive)
}

function remove(id: number): AxiosPromise {
  return axios.delete(`${httpConfig.baseUrl}/archives/${id}`)
}

export const archivesAPI = {
  getLatest,
  create,
  update,
  remove,
}
