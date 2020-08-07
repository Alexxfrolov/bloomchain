import React, { useEffect, useState } from "react"
import Container from "@material-ui/core/Container"
import { metricsApi } from "@api/metrics"
import type { Metrics, FiltersParams } from "@api/metrics"
import type { Banner } from "@api/banners"
import { MetricsTable } from "@features/metrics"
import type { RequestStatus } from "@features/core"

type MetricsPageState = {
  request_status: RequestStatus
  error: string | null
  data: { metrics: Metrics; banner: Banner }[]
} & FiltersParams

export function MetricsPage() {
  const [state, setState] = useState<MetricsPageState>({
    request_status: "pending",
    error: null,
    data: [],
    since: null,
    until: null,
  })

  useEffect(() => {
    const params = {
      since: state.since,
      until: state.until,
    } as const

    metricsApi
      .get(params)
      .then(({ data: { data } }) =>
        setState((state) => ({
          ...state,
          data,
          error: null,
          request_status: "success",
        })),
      )
      .catch((error) =>
        setState((state) => ({ ...state, error, request_status: "error" })),
      )
  }, [state.since, state.until])

  return (
    <Container maxWidth="lg">
      <MetricsTable
        data={state.data}
        isLoading={state.request_status === "pending"}
      />
    </Container>
  )
}
