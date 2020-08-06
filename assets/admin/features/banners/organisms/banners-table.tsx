import React, { useCallback } from "react"
import format from "date-fns/format"
import { Column } from "material-table"
import IconEdit from "@material-ui/icons/EditRounded"
import { Table } from "@features/core"
import type { Pagination, OrderDirection } from "@api/common"
import type { Banner } from "@api/banners"

type AuthorsTableProps = {
  isLoading: boolean
  data: Banner[]
  pagination: Pagination
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (pageSize: number) => void
  onOrderChange: (orderBy: keyof Banner, orderDirection: OrderDirection) => void
  onRowDelete: (banner: Banner) => Promise<void>
  onRowEdit: (banner: Banner) => void
}

export function BannersTable(props: AuthorsTableProps) {
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
      onOrderChange(field as keyof Banner, orderDirection)
    },
    [onOrderChange],
  )

  const handleRowDelete = useCallback((banner: Banner) => onRowDelete(banner), [
    onRowDelete,
  ])

  const handleClickEditAtion = (
    _event: unknown,
    archive: Banner | Banner[],
  ) => {
    if (Array.isArray(archive)) {
      return
    }
    onRowEdit(archive)
  }

  const notEmptyData = !!data.length

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
}

const columns: Column<Banner>[] = [
  {
    title: "Клиент",
    field: "client",
    cellStyle: {
      padding: "16px 8px",
    },
  },
  {
    title: "Ссылка перехода",
    field: "target_url",
    cellStyle: {
      padding: "16px 8px",
    },
    render: (banner) => (
      <a href={banner.target_url} target="_blank" rel="noopener noreferrer">
        {banner.target_url}
      </a>
    ),
  },
  {
    title: "Расположение баннера",
    field: "type",
    cellStyle: {
      padding: "16px 8px",
    },
  },
  {
    title: "Desktop картинка",
    field: "desktop_cover",
    cellStyle: {
      padding: "16px 8px",
    },
    render: (banner) => (
      <img
        style={{ maxWidth: "200px", objectFit: "contain" }}
        src={banner.desktop_cover.url}
        alt=""
      />
    ),
  },
  {
    title: "Mobile картинка",
    field: "mobile_cover",
    cellStyle: {
      padding: "16px 8px",
    },
    render: (banner) => (
      <img
        style={{ maxWidth: "200px", objectFit: "contain" }}
        src={banner.mobile_cover.url}
        alt=""
      />
    ),
  },
  {
    title: "Дата начала показов",
    field: "date_start",
    cellStyle: {
      padding: "16px 8px",
    },
    render: (banner) => format(new Date(banner.date_start), "dd.MM.yyyy"),
  },
  {
    title: "Дата окончания показов",
    field: "date_end",
    cellStyle: {
      padding: "16px 8px",
    },
    render: (banner) => format(new Date(banner.date_end), "dd.MM.yyyy"),
  },
]
