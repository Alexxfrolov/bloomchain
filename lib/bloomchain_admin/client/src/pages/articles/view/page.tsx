import React, { memo, useState, useEffect, useCallback, useMemo } from "react"
import { useRoute } from "react-router5"
import { Container } from "@material-ui/core"
import { OrderDirection, Pagination } from "@api/common/types"
import { articlesApi, Article } from "@api/articles"
import { RequestStatus } from "@features/core"
import { ArticlesTable } from "@features/articles"

type ArticlesViewPageState = {
  data: Article[]
  error: string | null
  orderBy: keyof Article
  orderDirection: OrderDirection
  pagination: Pagination
  query: string
  request_status: RequestStatus
  since: Date | null
  status: Article["status"] | null
  type: Article["type"]
  until: Date | null
}

export const ArticlesViewPage = memo(() => {
  const { route, router } = useRoute()

  const [state, setState] = useState<ArticlesViewPageState>({
    data: [],
    error: null,
    orderBy: "published_at",
    orderDirection: "desc",
    pagination: {
      page: 1,
      page_size: 25,
      page_size_options: [25, 50, 100],
      total_pages: 1,
      total_items: 0,
    },
    query: "",
    since: null,
    status: null,
    request_status: "pending",
    type: "newsfeed",
    until: null,
  })

  useEffect(() => {
    const status = route.name.split(".")[2] as Article["status"]
    setState((state) => ({ ...state, status }))
  }, [route.name])

  useEffect(() => {
    if (state.status) {
      if (state.query.length === 0) {
        const params = {
          status: state.status,
          type: state.type,
          page_size: state.pagination.page_size,
          page: state.pagination.page,
          orderDirection: state.orderDirection,
          orderBy: state.orderBy,
        } as const

        articlesApi
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
      } else {
        setState((state) => ({ ...state, request_status: "pending" }))
        const params = {
          status: state.status,
          type: state.type,
          query: state.query,
        } as const

        articlesApi
          .search(params)
          .then(({ data: { data } }) =>
            setState((state) => ({
              ...state,
              data,
              error: null,
              request_status: "success",
            })),
          )
          .catch((error) =>
            setState((state) => ({ ...state, error, request_status: "error" })),
          )
      }
    }
  }, [
    state.orderBy,
    state.orderDirection,
    state.pagination.page_size,
    state.pagination.page,
    state.query,
    state.status,
    state.type,
    route.name,
  ])

  useEffect(() => {
    console.log(state.status)
    setState((state) => ({
      ...state,
      orderBy: "published_at",
      orderDirection: "desc",
      query: "",
      since: null,
      until: null,
    }))
  }, [state.status])

  useEffect(() => {
    setState((state) => ({
      ...state,
      orderBy: "published_at",
      orderDirection: "desc",
      query: "",
      since: null,
      until: null,
    }))
  }, [state.type])

  // const handleDateStartChange = useCallback(
  //   (date: Date | null) => setState((state) => ({ ...state, since: date })),
  //   [],
  // )

  // const handleDateEndChange = useCallback(
  //   (date: Date | null) => setState((state) => ({ ...state, until: date })),
  //   [],
  // )

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
    (orderBy: keyof Article, orderDirection: OrderDirection) => {
      setState((state) => ({ ...state, orderDirection, orderBy }))
    },
    [],
  )

  const handleTableSearchChange = useCallback(
    (query: string) => setState((state) => ({ ...state, query })),
    [],
  )

  const handleClickEditArticle = useCallback(
    (id: number) => router.navigate("admin.articles.edit", { id }),
    [router],
  )

  const handleTableSelectFilterChange = useCallback(
    (type: Article["type"]) => setState((state) => ({ ...state, type })),
    [],
  )

  const deleteArticle = useCallback((article: Article) => {
    setState((state) => ({ ...state, request_status: "pending" }))
    return articlesApi
      .remove(article.id)
      .then(() =>
        setState((state) => ({
          ...state,
          error: null,
          request_status: "success",
          data: state.data.filter((item) => item.id !== article.id),
        })),
      )
      .catch((error) =>
        setState((state) => ({ ...state, error, request_status: "error" })),
      )
  }, [])

  const tableTitle = useMemo(
    () =>
      state.status
        ? mapStatusToTableTitle[state.status]
        : "Не известный раздел",
    [state.status],
  )

  return (
    <Container maxWidth="lg">
      <ArticlesTable
        data={state.data}
        isLoading={state.request_status === "pending"}
        pagination={state.pagination}
        searchText={state.query}
        title={tableTitle}
        type={state.type}
        onChangePage={handleTablePageChange}
        onChangeRowsPerPage={handleChangeTableRowsPerPage}
        onChangeSelectFilter={handleTableSelectFilterChange}
        onClickEditArticle={handleClickEditArticle}
        onOrderChange={handleTableOrderChange}
        onRowDelete={deleteArticle}
        onSearchChange={handleTableSearchChange}
      />
    </Container>
  )
})

const mapStatusToTableTitle = {
  archive: "Архив",
  published: "Опубликовано",
  ready: "Готово к публикации",
  draft: "Черновик",
}
