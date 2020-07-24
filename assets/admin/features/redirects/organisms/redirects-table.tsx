import React, { useCallback } from "react"
import format from "date-fns/format"
import { Column } from "material-table"
import type { Pagination, OrderDirection } from "@api/common"
import type { Redirect } from "@api/redirects"
import { Table } from "@features/core"

type RedirectsTableProps = {
  isLoading: boolean
  data: Redirect[]
  pagination: Pagination
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (pageSize: number) => void
  onOrderChange: (
    orderBy: keyof Redirect,
    orderDirection: OrderDirection,
  ) => void
}

export function RedirectsTable(props: RedirectsTableProps) {
  const {
    data,
    isLoading,
    pagination,
    onChangePage,
    onChangeRowsPerPage,
    onOrderChange,
  } = props

  const handleOrderChange = useCallback(
    (orderBy: number, orderDirection: OrderDirection) => {
      const { field } = columns[orderBy]
      onOrderChange(field as keyof Redirect, orderDirection)
    },
    [onOrderChange],
  )

  const notEmptyData = !!data.length

  return (
    <Table
      title="Редиректы"
      data={data}
      columns={columns}
      isLoading={isLoading}
      page={pagination.page - 1}
      totalCount={pagination.total_items}
      options={{
        sorting: notEmptyData,
        paging: notEmptyData,
        pageSize: pagination.page_size,
        pageSizeOptions: pagination.page_size_options,
      }}
      onOrderChange={handleOrderChange}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  )
}

const columns: Column<Redirect>[] = [
  {
    field: "path_from",
    title: "Path from",
    sorting: false,
    render: (redirect) => (
      <a href={redirect.path_from} target="_blank" rel="noopener noreferrer">
        {redirect.path_from}
      </a>
    ),
  },
  {
    field: "path_to",
    title: "Path to",
    sorting: false,
    render: (redirect) => (
      <a href={redirect.path_to} target="_blank" rel="noopener noreferrer">
        {redirect.path_to}
      </a>
    ),
  },
  {
    field: "inserted_at",
    title: "Дата создания",
    render: (redirect) => format(new Date(redirect.inserted_at), "dd.MM.yyyy"),
  },
  {
    field: "updated_at",
    title: "Дата обновления",
    render: (redirect) => format(new Date(redirect.updated_at), "dd.MM.yyyy"),
  },
]
