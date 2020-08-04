import { serialize } from "object-to-formdata"
import { request } from "@features/core"

import type { Pagination, PaginationParams, OrderParams } from "../common"
import type { MediaFile } from "../media"

export type BannerType = "header" | "article"
export type BannerStatus = "active" | "waiting" | "unactive"

export interface Banner {
  updated_at: string | Date | number | null
  type: BannerType
  target_url: string
  status: "active"
  mobile_cover: MediaFile
  inserted_at: string | Date | number | null
  id: number
  desktop_cover: MediaFile
  date_start: string | Date | number
  date_end: string | Date | number
  client: string
}

type Params = Partial<OrderParams<Banner>> & Partial<PaginationParams>

function get(params: Params) {
  return request<{ data: Banner[]; meta: Pagination }>("GET", "/banners", {
    params,
  })
}

export interface UploadableBanner
  extends Omit<
    Banner,
    "id" | "updated_at" | "inserted_at" | "mobile_cover" | "desktop_cover"
  > {
  mobile_cover: {
    type: "banner"
    file: File
  }
  desktop_cover: {
    type: "banner"
    file: File
  }
}

function create(data: UploadableBanner) {
  const formData = serialize(data)
  // const formData = new FormData()
  // Object.keys(data).forEach((key) =>
  //   typeof data[key] === "object"
  //     ? formData.append(
  //         key,
  //         new Blob([JSON.stringify(data[key])], { type: "application/json" }),
  //       )
  //     : formData.append(key, data[key]),
  // )
  return request<Banner>("POST", "/banners", { data: formData })
}

export interface EditableMediaFile {
  alt: string | null
  id: MediaFile["id"]
  source?: string | null
  title?: string | null
}

function update(banner: EditableMediaFile) {
  return request<MediaFile>("PATCH", `/banners/${banner.id}`, {
    data: {
      ...banner,
    },
  })
}

function remove(id: number) {
  return request<MediaFile>("DELETE", `/banners/${id}`)
}

export const bannersApi = {
  get,
  create,
  update,
  remove,
}
