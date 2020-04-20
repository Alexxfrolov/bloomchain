import axios, { AxiosPromise } from "axios"
import decamelize from "decamelize"
import { httpConfig } from "@features/core"

import { Pagination } from "../types"

import { MediaFile, UploadableMediaFile, EditableMediaFile } from "./types"

interface Params {
  type: MediaFile["type"]
  page_size: number | "all"
  page: number
}

function get(
  params: Params,
): AxiosPromise<{ data: MediaFile[]; meta: Pagination }> {
  return axios.get(`${httpConfig.baseUrl}/media`, {
    params,
  })
}

function create(file: UploadableMediaFile): AxiosPromise<MediaFile> {
  const formData = new FormData()
  Object.keys(file).forEach((key) =>
    formData.append(decamelize(key), file[key]),
  )
  return axios.post(`${httpConfig.baseUrl}/media`, formData)
}

function update(media: EditableMediaFile): AxiosPromise<MediaFile> {
  return axios.patch(`${httpConfig.baseUrl}/media/${media.id}`, media)
}

function remove(id: number): AxiosPromise<MediaFile> {
  return axios.delete(`${httpConfig.baseUrl}/media/${id}`)
}

export const mediaApi = {
  get,
  create,
  update,
  remove,
}
