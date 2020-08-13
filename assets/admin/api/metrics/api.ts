import format from "date-fns/format"
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

function get(params: MetricsParams) {
  const { status, since, until } = params

  const since_with_zero_time = since
    ? format(new Date(since), "yyyy-MM-dd") + "T00:00:00Z"
    : null
  const until_with_zero_time = until
    ? format(new Date(until), "yyyy-MM-dd") + "T23:59:59Z"
    : null

  return request<{ data: { metrics: Metrics; banner: Banner }[] }>(
    "GET",
    "/statistics",
    {
      params: {
        status,
        since: since_with_zero_time,
        until: until_with_zero_time,
      },
    },
  )
}

export const metricsApi = {
  get,
}
