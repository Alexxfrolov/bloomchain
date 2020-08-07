import React from "react"
import { Column } from "material-table"
import type { Metrics } from "@api/metrics"
import type { Banner } from "@api/banners"
import { Table } from "@features/core"

type MetricsTableProps = {
  isLoading: boolean
  data: { metrics: Metrics; banner: Banner }[]
}

export function MetricsTable(props: MetricsTableProps) {
  const { data, isLoading } = props

  return (
    <Table
      title="Метрики"
      data={data}
      columns={columns}
      isLoading={isLoading}
      options={{
        sorting: false,
        paging: false,
        headerStyle: {
          padding: "16px",
          fontSize: "0.875rem",
        },
      }}
    />
  )
}

const columns: Column<{ metrics: Metrics; banner: Banner }>[] = [
  { field: "banner.client", title: "Клиент" },
  { field: "banner.type", title: "Тип баннера" },
  { field: "metrics.total_views", title: "Просмотры" },
  { field: "metrics.total_clicks", title: "Клики" },
  { field: "metrics.ctr", title: "CTR" },
]
