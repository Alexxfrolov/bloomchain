import { request } from "@features/core"

import type { Banner } from "../banners"

export interface Metrics {
  total_views: number
  total_clicks: number
  ctr: string
}

export type FiltersParams = {
  since?: Date | string | null
  until?: Date | string | null
}

function get(filters: FiltersParams) {
  return request<{ data: { metrics: Metrics; banner: Banner }[] }>(
    "GET",
    "/statistics",
    {
      params: {
        ...filters,
      },
    },
  )
}

export const metricsApi = {
  get,
}
