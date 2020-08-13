import format from "date-fns/format"
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
  status: BannerStatus
  mobile_cover: MediaFile
  inserted_at: string | Date | number | null
  id: number
  desktop_cover: MediaFile
  date_start: string | Date | number
  date_end: string | Date | number
  client: string
}

type Params = Partial<OrderParams<Banner>> &
  Partial<PaginationParams> & {
    status: BannerStatus
  }

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
  const data_with_zero_time_date_end = {
    ...data,
    date_end: format(new Date(data.date_end), "yyyy-MM-dd") + "T00:00:00Z",
  }
  const formData = serialize(data_with_zero_time_date_end)
  return request<Banner>("POST", "/banners", { data: formData })
}

export interface EditableBanner extends Banner {
  desktop_cover: {
    file: File | null
  } & Banner["desktop_cover"]
  mobile_cover: {
    file: File | null
  } & Banner["mobile_cover"]
}

function update(banner: EditableBanner) {
  const banner_with_zero_time_date_end = {
    ...banner,
    date_end: format(new Date(banner.date_end), "yyyy-MM-dd") + "T00:00:00Z",
  }

  if (banner_with_zero_time_date_end.desktop_cover.url !== null) {
    delete banner_with_zero_time_date_end.desktop_cover.file
  }

  if (banner_with_zero_time_date_end.mobile_cover.url !== null) {
    delete banner_with_zero_time_date_end.mobile_cover.file
  }

  if (
    banner_with_zero_time_date_end.desktop_cover.file ||
    banner_with_zero_time_date_end.mobile_cover.file
  ) {
    const formData = serialize(banner_with_zero_time_date_end)
    return request<Banner>(
      "PATCH",
      `/banners/${banner_with_zero_time_date_end.id}`,
      {
        data: formData,
      },
    )
  }

  return request<Banner>(
    "PATCH",
    `/banners/${banner_with_zero_time_date_end.id}`,
    {
      data: {
        ...banner_with_zero_time_date_end,
      },
    },
  )
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
