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
      data={data}
      columns={columns}
      isLoading={isLoading}
      options={{
        toolbar: false,
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
  {
    field: "banner.desktop_cover",
    title: "Тип баннера",
    render: (data) => (
      <img
        style={{ maxWidth: "200px", objectFit: "contain" }}
        src={data.banner.desktop_cover.url}
        alt=""
      />
    ),
  },
  { field: "metrics.total_views", title: "Просмотры", type: "numeric" },
  { field: "metrics.total_clicks", title: "Клики", type: "numeric" },
  { field: "metrics.ctr", title: "CTR", type: "numeric" },
]
