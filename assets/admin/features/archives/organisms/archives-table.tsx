import React, { memo, useCallback } from "react"
import format from "date-fns/format"
import { Column } from "material-table"
import IconEdit from "@material-ui/icons/EditRounded"
import { Pagination, OrderDirection } from "@api/common"
import { Archive } from "@api/archives"
import { Table } from "@features/core"

type ArchivesTableProps = {
  data: Archive[]
  isLoading: boolean
  pagination: Pagination
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (pageSize: number) => void
  onOrderChange: (
    orderBy: keyof Archive,
    orderDirection: OrderDirection,
  ) => void
  onRowDelete: (archive: Archive) => Promise<void>
  onRowEdit: (archive: Archive) => void
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
    onRowDelete,
    onRowEdit,
  } = props

  const handleOrderChange = useCallback(
    (orderBy: number, orderDirection: OrderDirection) => {
      const { field } = columns[orderBy]
      onOrderChange(field as keyof Archive, orderDirection)
    },
    [onOrderChange],
  )

  const handleRowDelete = useCallback((tag: Archive) => onRowDelete(tag), [
    onRowDelete,
  ])

  const notEmptyData = !!data.length

  const handleClickEditAtion = (
    _event: unknown,
    archive: Archive | Archive[],
  ) => {
    if (Array.isArray(archive)) {
      return
    }
    onRowEdit(archive)
  }

  return (
    <Table
      data={data}
      columns={columns}
      isLoading={isLoading}
      page={pagination.page - 1}
      totalCount={pagination.total_items}
      options={{
        toolbar: false,
        sorting: notEmptyData,
        paging: notEmptyData,
        pageSize: pagination.page_size,
        pageSizeOptions: pagination.page_size_options,
      }}
      editable={{
        onRowDelete: handleRowDelete,
      }}
      actions={[
        {
          icon: () => <IconEdit />,
          tooltip: "Редактирование архива",
          onClick: handleClickEditAtion,
        },
      ]}
      onOrderChange={handleOrderChange}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  )
})

const columns: Column<Archive>[] = [
  {
    title: "Баннер",
    field: "banner",
    sorting: false,
    render: (archive) => (
      <img
        style={{ maxHeight: "200px", objectFit: "contain" }}
        src={archive.cover.url}
        alt={archive.cover.alt ?? ""}
        title={archive.cover.title ?? ""}
      />
    ),
  },
  {
    title: "PDF",
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
