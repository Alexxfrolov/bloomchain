import axios, { AxiosPromise } from "axios"
import decamelize from "decamelize"
import { httpConfig } from "@features/core"

import { Media } from "./types"

function get(): AxiosPromise<{ data: Media[] }> {
  return axios.get(`${httpConfig.baseUrl}/media`)
}

type UploadMediaFile = Omit<
  Media,
  "created_at" | "link" | "id" | "type" | "updated_at"
> & { image: File }

function create(file: UploadMediaFile): AxiosPromise<Media> {
  const formData = new FormData()
  Object.keys(file).forEach((key) =>
    formData.append(decamelize(key), file[key]),
  )
  return axios.post(`${httpConfig.baseUrl}/media`, formData)
}

function update(media: Media): AxiosPromise<Media> {
  return axios.patch(`${httpConfig.baseUrl}/articles/${media.id}`, media)
}

function remove(id: number): AxiosPromise {
  return axios.delete(`${httpConfig.baseUrl}/media/${id}`)
}

export const mediaApi = {
  get,
  create,
  update,
  remove,
}
