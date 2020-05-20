import decamelize from "decamelize"
import { request } from "@features/core"

import { Pagination, PaginationParams } from "../common"

export interface MediaFile {
  alt: string | null
  inserted_at: string
  id: number
  url: string
  source: string | null
  title: string | null
  type: "image" | "pdf" | "video"
  updated_at: string
}

interface Params extends Partial<PaginationParams> {
  type: MediaFile["type"]
}

function get(params: Params) {
  return request<{ data: MediaFile[]; meta: Pagination }>("GET", "/media", {
    params,
  })
}

export interface UploadableMediaFile {
  alt: string
  file: File
  source?: string | null
  title?: string | null
  type: MediaFile["type"]
}

function create(file: UploadableMediaFile) {
  const formData = new FormData()
  Object.keys(file).forEach((key) =>
    formData.append(decamelize(key), file[key]),
  )
  return request<MediaFile>("POST", "/media", { data: formData })
}

export interface EditableMediaFile {
  alt: string
  id: MediaFile["id"]
  source?: string | null
  title?: string | null
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
