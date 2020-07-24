import { request } from "@features/core"

import type { OrderParams, Pagination, PaginationParams } from "../common"
import type { Article } from "../articles"

export interface Section {
  id: number
  inserted_at: Date | string
  name: string
  seo_settings: {
    description: string
    title: string
  }
  slug: Article["type"]
  updated_at: Date | string
}

type Params = Partial<OrderParams<Section>> & Partial<PaginationParams>

function get({
  orderDirection = "desc",
  orderBy = "inserted_at",
  page_size = 25,
  page = 1,
}: Params) {
  return request<{ data: Section[]; meta: Pagination }>("GET", "/sections", {
    params: {
      page_size,
      page,
      sort_by: `${orderDirection}(${orderBy})`,
    },
  })
}

function getAll() {
  return request<{ data: Section[] }>("GET", "/sections")
}

function update(section: Section) {
  return request<Section>("PATCH", `/sections/${section.id}`, {
    data: {
      ...section,
    },
  })
}

export const sectionsApi = {
  get,
  getAll,
  update,
}
