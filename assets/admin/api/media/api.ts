import decamelize from "decamelize"
import { request } from "@features/core"

import { Pagination, PaginationParams } from "../common"

export type MediaFileType = "image" | "pdf" | "video"

export interface MediaFile {
  alt: string | null
  id: number
  inserted_at: string
  source: string | null
  srcset?: string
  title: string | null
  type: MediaFileType
  updated_at: string
  url: string
}

interface Params extends Partial<PaginationParams> {
  type: MediaFile["type"]
}

function get(params: Params) {
  return request<{ data: MediaFile[]; meta: Pagination }>("GET", "/media", {
    params,
  })
}

function getById(id: number) {
  return request<MediaFile>("GET", `/media/${id}`)
}

export interface UploadableMediaFile {
  alt?: string
  file: File
  source?: string | null
  title?: string | null
  type: MediaFile["type"]
}

function create(data: UploadableMediaFile) {
  const formData = new FormData()
  Object.keys(data).forEach((key) =>
    formData.append(decamelize(key), data[key]),
  )
  if (!data.title) formData.append("title", data.file.name)
  return request<MediaFile>("POST", "/media", { data: formData })
}

export interface EditableMediaFile {
  alt: string | null
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
  getById,
  create,
  update,
  remove,
}
