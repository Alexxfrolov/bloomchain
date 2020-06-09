import React, { useState, useEffect } from "react"
import { useRoute } from "react-router5"
import {
  Container,
  Paper,
  Typography,
  Toolbar,
  FormControl,
  Button,
  makeStyles,
  createStyles,
} from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { ru } from "date-fns/locale"
import { SearchField } from "@ui/molecules/search-field"
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

export function ArticlesViewPage() {
  const classes = useStyles()
  const { route, router } = useRoute()

  const initialStatus = route.name.split(".")[2] as Article["status"]

  const [state, setState] = useState<ArticlesViewPageState>({
    data: [],
    error: null,
    orderBy: ["published", "ready"].includes(initialStatus)
      ? "published_at"
      : "inserted_at",
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
    status: initialStatus,
    request_status: "pending",
    type: "newsfeed",
    until: null,
  })

  useEffect(() => {
    const status = route.name.split(".")[2] as Article["status"]

    if (state.query.length === 0) {
      const params = {
        status,
        type: state.type,
        page_size: state.pagination.page_size,
        page: state.pagination.page,
        orderDirection: state.orderDirection,
        orderBy: state.orderBy,
        since: state.since,
        until: state.until,
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
        .finally(() =>
          setState((state) => ({
            ...state,
            status,
          })),
        )
    } else {
      const params = {
        status,
        type: state.type,
        query: state.query,
      } as const

      setState((state) => ({ ...state, request_status: "pending" }))

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
        .finally(() =>
          setState((state) => ({
            ...state,
            status: params.status,
          })),
        )
    }
  }, [
    state.orderBy,
    state.orderDirection,
    state.pagination.page_size,
    state.pagination.page,
    state.query,
    state.type,
    state.since,
    state.until,
    route.name,
  ])

  useEffect(() => {
    setState((state) => ({
      ...state,
      orderBy: ["published", "ready"].includes(
        route.name.split(".")[2] as Article["status"],
      )
        ? "published_at"
        : "inserted_at",
      orderDirection: "desc",
      type: "newsfeed",
      query: "",
      since: null,
      until: null,
    }))
  }, [state.status, route.name])

  useEffect(() => {
    setState((state) => ({
      ...state,
      orderBy: ["published", "ready"].includes(
        route.name.split(".")[2] as Article["status"],
      )
        ? "published_at"
        : "inserted_at",
      orderDirection: "desc",
      query: "",
      since: null,
      until: null,
    }))
  }, [state.type, route.name])

  const handleDateSinceChange = (date: Date | null) =>
    setState((state) => ({ ...state, since: date }))

  const handleDateUntilChange = (date: Date | null) =>
    setState((state) => ({ ...state, until: date }))

  const handleResetButtonClick = () =>
    setState((state) => ({ ...state, since: null, until: null }))

  const handleTablePageChange = (page: number) =>
    setState((state) => ({
      ...state,
      pagination: { ...state.pagination, page: page + 1 },
    }))

  const handleChangeTableRowsPerPage = (page_size: number) =>
    setState((state) => ({
      ...state,
      pagination: {
        ...state.pagination,
        page: 1,
        page_size,
      },
    }))

  const handleTableOrderChange = (
    orderBy: keyof Article,
    orderDirection: OrderDirection,
  ) => {
    setState((state) => ({ ...state, orderDirection, orderBy }))
  }

  const handleSearchFieldChange = (query: string) => {
    setState((state) => ({ ...state, query }))
  }

  const handleClickEditArticle = (id: number) =>
    router.navigate("admin.articles.edit", { id })

  const handleTableSelectFilterChange = (type: Article["type"]) =>
    setState((state) => ({ ...state, type }))

  const deleteArticle = (article: Article) => {
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
  }

  const title = state.status
    ? mapStatusToTableTitle[state.status]
    : "Не известный раздел"

  return (
    <Container maxWidth="lg">
      <Paper>
        <Toolbar>
          <div className={classes.toolbarTitle}>
            <Typography component="h1" variant="h5">
              {title}
            </Typography>
          </div>
          <div className={classes.toolbarSpacer}></div>
          <div className={classes.toolbarSearchField}>
            <SearchField
              fullWidth={true}
              searchText={state.query}
              onChange={handleSearchFieldChange}
              onClear={() => setState((state) => ({ ...state, query: "" }))}
            />
          </div>
        </Toolbar>
        {/* <Toolbar>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
            <div className={classes.toolbarDate}>
              <FormControl>
                <DatePicker
                  variant="inline"
                  margin="none"
                  inputVariant="outlined"
                  label="Дата начала"
                  format="dd/MM/yyyy"
                  disableFuture={true}
                  size="small"
                  value={state.since}
                  onChange={handleDateSinceChange}
                />
              </FormControl>
              <FormControl>
                <DatePicker
                  variant="inline"
                  margin="none"
                  inputVariant="outlined"
                  label="Дата окончания"
                  format="dd/MM/yyyy"
                  disableFuture={true}
                  size="small"
                  value={state.until}
                  onChange={handleDateUntilChange}
                />
              </FormControl>
              <FormControl>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={handleResetButtonClick}
                >
                  Сбросить
                </Button>
              </FormControl>
            </div>
          </MuiPickersUtilsProvider>
        </Toolbar> */}
        <ArticlesTable
          data={state.data}
          isLoading={state.request_status === "pending"}
          pagination={state.pagination}
          type={state.type}
          onChangePage={handleTablePageChange}
          onChangeRowsPerPage={handleChangeTableRowsPerPage}
          onChangeSelectFilter={handleTableSelectFilterChange}
          onClickEditArticle={handleClickEditArticle}
          onOrderChange={handleTableOrderChange}
          onRowDelete={deleteArticle}
        />
      </Paper>
    </Container>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    toolbarTitle: {
      overflow: "hidden",
    },
    toolbarSpacer: {
      flex: "1 1 10%",
    },
    toolbarSearchField: {
      "min-width": "500px",
      "padding-left": "16px",
    },
    toolbarDate: {
      display: "flex",
      alignItems: "center",

      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }),
)

const mapStatusToTableTitle = {
  archive: "Архив",
  published: "Опубликовано",
  ready: "Готово к публикации",
  draft: "Черновик",
}
