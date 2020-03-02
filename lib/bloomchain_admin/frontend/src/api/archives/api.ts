import axios, { AxiosPromise } from "axios"
// import decamelize from "decamelize"
import { httpConfig } from "@features/core"

import { Archive } from "./types"

function getLatest(): AxiosPromise<{ data: Archive[] }> {
  return axios.get(`${httpConfig.baseUrl}/archives`)
}

function create(cover_id: number, pdf_id: number): AxiosPromise<Archive> {
  return axios.post(`${httpConfig.baseUrl}/archives`, { cover_id, pdf_id })
}

function remove(id: number): AxiosPromise {
  return axios.delete(`${httpConfig.baseUrl}/archives/${id}`)
}

export const archivesApi = {
  getLatest,
  create,
  remove,
}
