import { request } from "@features/core"

import type { Banner } from "../banners"

export interface Metrics {
  total_views: number
  total_clicks: number
  ctr: string
}

export type MetricsParams = {
  status: Exclude<Banner["status"], "waiting">
  since?: Date | string | null
  until?: Date | string | null
}

function get(params?: MetricsParams) {
  return request<{ data: { metrics: Metrics; banner: Banner }[] }>(
    "GET",
    "/statistics",
    {
      params: {
        ...params,
      },
    },
  )
}

export const metricsApi = {
  get,
}
