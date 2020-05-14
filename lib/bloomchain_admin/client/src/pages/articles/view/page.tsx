import React, {
  Fragment,
  memo,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ChangeEvent,
} from "react"
import { useRoute } from "react-router5"
import DateFnsUtils from "@date-io/date-fns"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { ru } from "date-fns/locale"
import {
  Container,
  AppBar,
  Tabs,
  Tab,
  FormControl,
  TextField,
  ButtonGroup,
  Button,
  makeStyles,
  createStyles,
  Toolbar,
} from "@material-ui/core"
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
  status: Article["status"]
  tabIndex: number
  type: Article["type"]
  until: Date | null
}

export const ArticlesViewPage = memo(() => {
  const { route, router } = useRoute()

  const status = useMemo(() => route.name.split(".")[2] as Article["status"], [
    route.name,
  ])

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
    status,
    request_status: "pending",
    tabIndex: 0,
    type: "newsfeed",
    until: null,
  })

  useEffect(() => {
    if (state.query.length === 0) {
      const params = {
        status: state.status,
        type: state.type,
        page_size: state.pagination.page_size,
        page: state.pagination.page,
        orderDirection: state.orderDirection,
        orderBy: state.orderBy,
      }
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
    }

    if (state.query.length > 0) {
      setState((state) => ({ ...state, request_status: "pending" }))
      const params = {
        status: state.status,
        type: state.type,
        query: state.query,
      }
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
  }, [
    state.orderBy,
    state.orderDirection,
    state.pagination.page_size,
    state.pagination.page,
    state.query,
    state.status,
    state.type,
  ])

  useEffect(() => {
    setState((state) => ({
      ...state,
      orderBy: "published_at",
      orderDirection: "desc",
      query: "",
      since: null,
      tabIndex: 0,
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

  const handleChangeTab = useCallback(
    (_event: ChangeEvent<{}>, tabIndex: number) =>
      setState((state) => ({
        ...state,
        type: mapTabIdToArticleType[tabIndex],
        tabIndex,
      })),
    [],
  )

  // const handleFilterFormSubmit = useCallback(
  //   async (event: FormEvent) => {
  //     event.preventDefault()
  //     try {
  //       const { page_size, page } = pagination
  //       const response = await articlesApi.get({
  //         status,
  //         type,
  //         page_size,
  //         page,
  //         orderDirection,
  //         orderBy,
  //         since,
  //         until,
  //       })
  //       setArticles([...response.data.data])
  //     } catch {}
  //   },
  //   [
  //     type,
  //     status,
  //     since,
  //     until,
  //     setArticles,
  //     orderDirection,
  //     orderBy,
  //     pagination,
  //   ],
  // )

  // const handleResetFilterFormButtonClick = useCallback(
  //   async () => {
  //     setSince(null)
  //     setUntil(null)
  //     try {
  //       const { page, page_size } = pagination
  //       const response = await articlesApi.get({
  //         status,
  //         type,
  //         page_size,
  //         page,
  //         orderDirection,
  //         orderBy,
  //       })
  //       setArticles([...response.data.data])
  //     } catch {}
  //   },
  //   [
  //     status,
  //     type,
  //     orderDirection,
  //     orderBy,
  //     pagination,
  //     setSince,
  //     setUntil,
  //     setArticles,
  //   ],
  // )

  // const debounceOnChange = useCallback(debounce(doSearch, 500), [status, type])

  // const handleChangeSearchInput = useCallback(
  //   (event: ChangeEvent<HTMLInputElement>) => {
  //     setQuery(event.target.value)
  //     debounceOnChange(event.target.value)
  //   },
  //   [debounceOnChange, setQuery],
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
    (id: number) => {
      console.log(id)
      return router.navigate("admin.articles.edit", { id })
    },
    [router],
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

  const tableTitle = useMemo(() => mapStatusToTableTitle[status], [status])

  return (
    <Container maxWidth="lg">
      {/* <form onSubmit={handleFilterFormSubmit} noValidate={true}> */}
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}> */}
      {/* <Toolbar disableGutters={true} className={classes.toolbar}> */}
      {/* <FormControl margin="none" variant="outlined">
              <DatePicker
                id="date-start"
                variant="dialog"
                margin="none"
                inputVariant="outlined"
                label="Дата начала"
                format="dd/MM/yyyy"
                size="small"
                value={state.since}
                onChange={handleDateStartChange}
              />
            </FormControl>
            <FormControl margin="none" variant="outlined">
              <DatePicker
                id="date-end"
                variant="dialog"
                margin="none"
                inputVariant="outlined"
                label="Дата окончания"
                format="dd/MM/yyyy"
                size="small"
                value={state.until}
                onChange={handleDateEndChange}
              />
            </FormControl>
            <ButtonGroup>
              <Button type="submit" variant="contained" color="primary">
                Показать
              </Button>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleResetFilterFormButtonClick}
              >
                Сбросить даты
              </Button>
            </ButtonGroup> */}
      {/* <TextField
                autoComplete="off"
                type="text"
                value={query}
                variant="outlined"
                size="small"
                onChange={handleChangeSearchInput}
              /> */}
      {/* </Toolbar>
        </MuiPickersUtilsProvider>
      </form> */}
      <AppBar position="static" color="default">
        <Tabs
          value={state.tabIndex}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Коротко" />
          <Tab label="В Деталях" />
          <Tab label="Что в России" />
          <Tab label="События" />
          <Tab label="Персона" />
          <Tab label="Исследования" />
          <Tab label="Биржевая аналитика" />
        </Tabs>
      </AppBar>

      <ArticlesTable
        data={state.data}
        searchText={state.query}
        isLoading={state.request_status === "pending"}
        pagination={state.pagination}
        title={tableTitle}
        onChangePage={handleTablePageChange}
        onChangeRowsPerPage={handleChangeTableRowsPerPage}
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

const mapTabIdToArticleType = {
  0: "newsfeed",
  1: "detailed",
  2: "in-russia",
  3: "calendar",
  4: "people",
  5: "research",
  6: "analysis",
}
