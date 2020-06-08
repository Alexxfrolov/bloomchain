import React, { memo, useCallback } from "react"
import format from "date-fns/format"
import { Column } from "material-table"
import { Pagination, OrderDirection } from "@api/common"
import { Subscriber } from "@api/subscribers"
import { Table } from "@features/core"

type SubscribersTableProps = {
  isLoading: boolean
  data: Subscriber[]
  pagination: Pagination
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (pageSize: number) => void
  onOrderChange: (
    orderBy: keyof Subscriber,
    orderDirection: OrderDirection,
  ) => void
}

export const SubscribersTable = memo(function SubscribersTable(
  props: SubscribersTableProps,
) {
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
      onOrderChange(field as keyof Subscriber, orderDirection)
    },
    [onOrderChange],
  )

  const notEmptyData = !!data.length

  return (
    <Table
      title="Подписчики"
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
})

const columns: Column<Subscriber>[] = [
  {
    field: "email",
    title: "Email",
  },
  {
    field: "inserted_at",
    title: "Дата подписки",
    defaultSort: "desc",
    render: (subscriber) =>
      format(new Date(subscriber.inserted_at), "dd.MM.yyyy HH:mm"),
  },
]
