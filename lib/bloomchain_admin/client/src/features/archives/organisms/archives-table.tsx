import React, { memo, useCallback } from "react"
import format from "date-fns/format"
import { Column } from "material-table"
import { Pagination, OrderDirection } from "@api/common"
import { Archive } from "@api/archives"
import { Table } from "@features/core"

type ArchivesTableProps = {
  isLoading: boolean
  data: Archive[]
  pagination: Pagination
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (pageSize: number) => void
  onOrderChange: (
    orderBy: keyof Archive,
    orderDirection: OrderDirection,
  ) => void
  onRowAdd: (tag: Archive) => Promise<void>
  onRowDelete: (tag: Archive) => Promise<void>
}

export const ArchivesTable = memo(function ArchivesTable(
  props: ArchivesTableProps,
) {
  const {
    data,
    isLoading,
    pagination,
    onChangePage,
    onChangeRowsPerPage,
    onOrderChange,
    onRowAdd,
    onRowDelete,
  } = props

  const handleOrderChange = useCallback(
    (orderBy: number, orderDirection: OrderDirection) => {
      const { field } = columns[orderBy]
      onOrderChange(field as keyof Archive, orderDirection)
    },
    [onOrderChange],
  )

  const handleRowAdd = useCallback((tag: Archive) => onRowAdd(tag), [onRowAdd])

  const handleRowDelete = useCallback((tag: Archive) => onRowDelete(tag), [
    onRowDelete,
  ])

  const notEmptyData = !!data.length

  return (
    <Table
      title="Исследования (архив)"
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
      editable={{
        onRowAdd: handleRowAdd,
        onRowDelete: handleRowDelete,
      }}
      onOrderChange={handleOrderChange}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  )
})

const columns: Column<Archive>[] = [
  {
    title: "Наименование",
    field: "banner",
    sorting: false,
    render: (archive) => (
      <img
        width="100%"
        src={archive.cover.url}
        alt={archive.cover.alt ?? ""}
        title={archive.cover.title ?? ""}
      />
    ),
  },
  {
    title: "Описание",
    field: "PDF",
    sorting: false,
    render: (archive) => (
      <object
        data={archive.pdf.url}
        type="application/pdf"
        width="160px"
        height="300px"
        aria-label="pdf preview"
      ></object>
    ),
  },
  {
    title: "Дата публикации",
    field: "inserted_at",
    defaultSort: "desc",
    render: (archive) => format(new Date(archive.inserted_at), "dd.MM.yyyy"),
  },
]