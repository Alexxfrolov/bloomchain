import React, { useEffect, useState, useCallback } from "react"
import { useSnackbar } from "notistack"
import Container from "@material-ui/core/Container"
import { OrderDirection, Pagination } from "@api/common/types"
import { sectionsApi } from "@api/sections"
import type { Section } from "@api/sections"
import { RequestStatus } from "@features/core"
import { SectionsTable } from "@features/sections"

type SectionsPageState = {
  request_status: RequestStatus
  error: string | null
  data: Section[]
  pagination: Pagination
  orderDirection: OrderDirection
  orderBy: keyof Section
}

export function SectionsPage() {
  const [state, setState] = useState<SectionsPageState>({
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
    orderBy: "updated_at",
  })
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const params = {
      page_size: state.pagination.page_size,
      page: state.pagination.page,
      orderDirection: state.orderDirection,
      orderBy: state.orderBy,
    } as const

    sectionsApi
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
      .catch((error) => {
        setState((state) => ({ ...state, error, request_status: "error" }))
        enqueueSnackbar("Произошла ошибка", {
          variant: "error",
        })
      })
  }, [
    state.pagination.page_size,
    state.pagination.page,
    state.orderDirection,
    state.orderBy,
    enqueueSnackbar,
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
    (orderBy: keyof Section, orderDirection: OrderDirection) => {
      console.log(orderBy, orderDirection)
      setState((state) => ({ ...state, orderDirection, orderBy }))
    },
    [],
  )

  const updateSection = useCallback(
    async (section: Section) => {
      setState((state) => ({ ...state, request_status: "pending" }))
      try {
        const response = await sectionsApi.update(section)
        setState((state) => ({
          ...state,
          error: null,
          request_status: "success",
          data: state.data.map((item) =>
            item.id !== response.data.id ? item : response.data,
          ),
        }))
        enqueueSnackbar("Раздел успешно обновлен", {
          variant: "success",
        })
      } catch (error) {
        setState((state) => ({ ...state, error, request_status: "error" }))
        enqueueSnackbar("Произошла ошибка", {
          variant: "error",
        })
      }
    },
    [enqueueSnackbar],
  )

  return (
    <Container maxWidth="lg">
      <SectionsTable
        data={state.data}
        isLoading={state.request_status === "pending"}
        pagination={state.pagination}
        onChangePage={handleTablePageChange}
        onChangeRowsPerPage={handleChangeTableRowsPerPage}
        onOrderChange={handleTableOrderChange}
        onRowUpdate={updateSection}
      />
    </Container>
  )
}
