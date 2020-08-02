import React, { useEffect, useState, useCallback } from "react"
import Container from "@material-ui/core/Container"
import { bannersApi } from "@api/banners"
import { SubscribersTable } from "@features/subscribers"
import type { OrderDirection, Pagination } from "@api/common/types"
import type { Subscriber } from "@api/subscribers"
import type { RequestStatus } from "@features/core"

type BannersPageState = {
  request_status: RequestStatus
  error: string | null
  data: Subscriber[]
  pagination: Pagination
  orderDirection: OrderDirection
  orderBy: keyof Subscriber
}

export function BannersPage() {
  const [state, setState] = useState<BannersPageState>({
    request_status: "pending",
    error: null,
    data: [],
    pagination: {
      page: 1,
      page_size: 25,
      page_size_options: [25, 50, 100],
      total_pages: 1,
      total_items: 0,
    },
    orderDirection: "desc",
    orderBy: "inserted_at",
  })

  useEffect(() => {
    const params = {
      page_size: state.pagination.page_size,
      page: state.pagination.page,
      orderDirection: state.orderDirection,
      orderBy: state.orderBy,
    } as const

    bannersApi
      .get(params)
      .then(({ data: { data, meta } }) =>
        setState((state) => ({
          ...state,
          data,
          pagination: { ...state.pagination, ...meta },
          error: null,
          request_status: "success",
        })),
      )
      .catch((error) =>
        setState((state) => ({ ...state, error, request_status: "error" })),
      )
  }, [
    state.pagination.page_size,
    state.pagination.page,
    state.orderDirection,
    state.orderBy,
  ])

  const handleTablePageChange = useCallback(
    (page: number) =>
      setState((state) => ({
        ...state,
        pagination: { ...state.pagination, page: page + 1 },
      })),
    [],
  )

  const handleChangeTableRowsPerPage = useCallback(
    (page_size: number) =>
      setState((state) => ({
        ...state,
        pagination: {
          ...state.pagination,
          page: 1,
          page_size,
        },
      })),
    [],
  )

  const handleTableOrderChange = useCallback(
    (orderBy: keyof Subscriber, orderDirection: OrderDirection) => {
      setState((state) => ({ ...state, orderDirection, orderBy }))
    },
    [],
  )

  return (
    <Container maxWidth="lg">
      <SubscribersTable
        data={state.data}
        isLoading={state.request_status === "pending"}
        pagination={state.pagination}
        onChangePage={handleTablePageChange}
        onChangeRowsPerPage={handleChangeTableRowsPerPage}
        onOrderChange={handleTableOrderChange}
      />
    </Container>
  )
}
