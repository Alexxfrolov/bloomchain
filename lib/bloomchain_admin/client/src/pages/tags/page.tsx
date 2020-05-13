import React, { memo, useEffect, useState, useCallback } from "react"
import Container from "@material-ui/core/Container"
import { OrderDirection, Pagination } from "@api/common/types"
import { tagsApi, Tag } from "@api/tags"
import { RequestStatus } from "@features/core"
import { TagsTable } from "@features/tags"

type TagsPageState = {
  status: RequestStatus
  error: string | null
  data: Tag[]
  pagination: Pagination
  orderDirection: OrderDirection
  orderBy: keyof Tag
}

export const TagsPage = memo(() => {
  const [state, setState] = useState<TagsPageState>({
    status: "pending",
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
    }
    tagsApi
      .get(params)
      .then(({ data: { data, meta } }) =>
        setState((state) => ({
          ...state,
          data,
          pagination: { ...state.pagination, ...meta },
          error: null,
          status: "success",
        })),
      )
      .catch((error) =>
        setState((state) => ({ ...state, error, status: "error" })),
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
    (orderBy: keyof Tag, orderDirection: OrderDirection) => {
      setState((state) => ({ ...state, orderDirection, orderBy }))
    },
    [],
  )

  const addTag = useCallback((tag: Tag) => {
    setState((state) => ({ ...state, status: "pending" }))
    return tagsApi
      .create(tag.name)
      .then((response) =>
        setState((state) => ({
          ...state,
          error: null,
          status: "success",
          data: [response.data, ...state.data],
        })),
      )
      .catch((error) =>
        setState((state) => ({ ...state, error, status: "error" })),
      )
  }, [])

  const deleteTag = useCallback((tag: Tag) => {
    setState((state) => ({ ...state, status: "pending" }))
    return tagsApi
      .remove(tag.id)
      .then(() =>
        setState((state) => ({
          ...state,
          error: null,
          status: "success",
          data: state.data.filter((item) => item.id !== tag.id),
        })),
      )
      .catch((error) =>
        setState((state) => ({ ...state, error, status: "error" })),
      )
  }, [])

  return (
    <Container maxWidth="md">
      <TagsTable
        data={state.data}
        isLoading={state.status === "pending"}
        pagination={state.pagination}
        onChangePage={handleTablePageChange}
        onChangeRowsPerPage={handleChangeTableRowsPerPage}
        onOrderChange={handleTableOrderChange}
        onRowAdd={addTag}
        onRowDelete={deleteTag}
      />
    </Container>
  )
})
