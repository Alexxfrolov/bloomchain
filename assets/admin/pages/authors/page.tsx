import React, { useEffect, useState, useCallback } from "react"
import Container from "@material-ui/core/Container"
import { OrderDirection, Pagination } from "@api/common/types"
import { authorsApi, Author } from "@api/authors"
import { RequestStatus } from "@features/core"
import { AuthorsTable } from "@features/authors"

type AuthorsPageState = {
  request_status: RequestStatus
  error: string | null
  data: Author[]
  pagination: Pagination
  orderDirection: OrderDirection
  orderBy: keyof Author
}

export function AuthorsPage() {
  const [state, setState] = useState<AuthorsPageState>({
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

    authorsApi
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
    (orderBy: keyof Author, orderDirection: OrderDirection) => {
      setState((state) => ({ ...state, orderDirection, orderBy }))
    },
    [],
  )

  const addAuthor = useCallback((authorName: string) => {
    setState((state) => ({ ...state, request_status: "pending" }))
    return authorsApi
      .create(authorName)
      .then((response) =>
        setState((state) => ({
          ...state,
          error: null,
          request_status: "success",
          data: [response.data, ...state.data],
        })),
      )
      .catch((error) =>
        setState((state) => ({ ...state, error, request_status: "error" })),
      )
  }, [])

  const updateAuthor = useCallback((author: Author) => {
    setState((state) => ({ ...state, request_status: "pending" }))
    return authorsApi
      .update(author)
      .then(({ data }) =>
        setState((state) => ({
          ...state,
          error: null,
          request_status: "success",
          data: state.data.map((item) => (item.id !== data.id ? item : data)),
        })),
      )
      .catch((error) =>
        setState((state) => ({ ...state, error, request_status: "error" })),
      )
  }, [])

  const deleteAuthor = useCallback((author: Author) => {
    setState((state) => ({ ...state, request_status: "pending" }))
    return authorsApi
      .remove(author.id)
      .then(() =>
        setState((state) => ({
          ...state,
          error: null,
          request_status: "success",
          data: state.data.filter((item) => item.id !== author.id),
        })),
      )
      .catch((error) =>
        setState((state) => ({ ...state, error, request_status: "error" })),
      )
  }, [])

  return (
    <Container maxWidth="lg">
      <AuthorsTable
        data={state.data}
        isLoading={state.request_status === "pending"}
        pagination={state.pagination}
        onChangePage={handleTablePageChange}
        onChangeRowsPerPage={handleChangeTableRowsPerPage}
        onOrderChange={handleTableOrderChange}
        onRowAdd={addAuthor}
        onRowDelete={deleteAuthor}
        onRowUpdate={updateAuthor}
      />
    </Container>
  )
}
