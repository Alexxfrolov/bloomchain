import decamelize from "decamelize"
import { request } from "@features/core"

import { Pagination, PaginationParams } from "../common"

import { MediaFile, UploadableMediaFile, EditableMediaFile } from "./types"

interface Params extends PaginationParams {
  type: MediaFile["type"]
}

function get(params: Params) {
  return request<{ data: MediaFile[]; meta: Pagination }>("GET", "/media", {
    params,
  })
}

function create(file: UploadableMediaFile) {
  const formData = new FormData()
  Object.keys(file).forEach((key) =>
    formData.append(decamelize(key), file[key]),
  )
  return request<MediaFile>("POST", "/media", { data: formData })
}

function update(media: EditableMediaFile) {
  return request<MediaFile>("PATCH", `/media/${media.id}`, {
    data: {
      ...media,
    },
  })
}

function remove(id: number) {
  return request<MediaFile>("DELETE", `/media/${id}`)
}

export const mediaApi = {
  get,
  create,
  update,
  remove,
}
