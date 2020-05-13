import React, { memo, useEffect, useState, useCallback } from "react"
import Container from "@material-ui/core/Container"
import { OrderDirection, Pagination } from "@api/common/types"
import { usersApi, User } from "@api/user"
import { RequestStatus } from "@features/core"
import { UsersTable } from "@features/users"

type UsersPageState = {
  status: RequestStatus
  error: string | null
  data: User[]
  pagination: Pagination
  orderDirection: OrderDirection
  orderBy: keyof User
}

export const UsersPage = memo(() => {
  const [state, setState] = useState<UsersPageState>({
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
    usersApi
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
    (orderBy: keyof User, orderDirection: OrderDirection) => {
      setState((state) => ({ ...state, orderDirection, orderBy }))
    },
    [],
  )

  const addUser = useCallback(async (user: Partial<User>) => {
    setState((state) => ({ ...state, status: "pending" }))
    try {
      const response = await usersApi.create(user)
      setState((state) => ({
        ...state,
        error: null,
        status: "success",
        data: [response.data, ...state.data],
      }))
    } catch (error) {
      setState((state) => ({ ...state, error, status: "error" }))
    }
  }, [])

  const updateUser = useCallback(async (author: User) => {
    setState((state) => ({ ...state, status: "pending" }))
    try {
      const { data: updatedUser } = await usersApi.update(author)
      setState((state) => ({
        ...state,
        error: null,
        status: "success",
        data: state.data.map((item) =>
          item.id !== updatedUser.id ? item : updatedUser,
        ),
      }))
    } catch (error) {
      setState((state) => ({ ...state, error, status: "error" }))
    }
  }, [])

  const deleteUser = useCallback(async (author: User) => {
    setState((state) => ({ ...state, status: "pending" }))
    try {
      const response = await usersApi.remove(author.id)
      setState((state) => ({
        ...state,
        error: null,
        status: "success",
        data: state.data.filter((item) => item.id !== author.id),
      }))
    } catch (error) {
      setState((state) => ({ ...state, error, status: "error" }))
    }
  }, [])

  return (
    <Container maxWidth="lg">
      <UsersTable
        data={state.data}
        isLoading={state.status === "pending"}
        pagination={state.pagination}
        onChangePage={handleTablePageChange}
        onChangeRowsPerPage={handleChangeTableRowsPerPage}
        onOrderChange={handleTableOrderChange}
        onRowAdd={addUser}
        onRowDelete={deleteUser}
        onRowUpdate={updateUser}
      />
    </Container>
  )
})
