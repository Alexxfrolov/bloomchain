import React, {
  Fragment,
  memo,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ChangeEvent,
  ReactElement,
  FormEvent,
} from "react"
import { useRoute } from "react-router5"
import DateFnsUtils from "@date-io/date-fns"
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import format from "date-fns/format"
import { ru } from "date-fns/locale"
import {
  Container,
  AppBar,
  Tabs,
  Tab,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableSortLabel,
  TablePagination,
  Typography,
  FormControl,
  TextField,
  ButtonGroup,
  Button,
  Link,
  IconButton,
  makeStyles,
  createStyles,
  Toolbar,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { Order, Pagination } from "@api/common/types"
import { articlesApi, Article } from "@api/articles"
import { ConditionalList } from "@ui"
import {
  RouterLink,
  DeleteDialog,
  TableRow,
  TableCell,
  TableSkeleton,
  debounce,
} from "@features/core"

const mapTitleByStatus = {
  archive: "Архив",
  published: "Опубликовано",
  ready: "Готово к публикации",
  draft: "Черновик",
}

const useStyles = makeStyles((theme) =>
  createStyles({
    toolbar: {
      marginBottom: theme.spacing(1),
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
    appBar: {
      marginBottom: theme.spacing(1),
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    tableSortLabel: {
      "&:hover": {
        color: "rgba(255, 255, 255, 0.54) !important",
      },
    },
    tableSortLabelActive: {
      color: "#fff !important",
    },
    tableSortLabelIcon: {
      color: "rgba(255, 255, 255, 0.54) !important",
    },
  }),
)

const PAGINATION_PRESET = {
  page: 1,
  page_size: 5,
  total_pages: 1,
  total_items: 0,
}

export const ArticlesViewPage = () => {
  const classes = useStyles()

  const { route } = useRoute()
  const [isDataLoading, setDataLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const status = useMemo(() => route.name.split(".")[2], [route.name])

  const [pagination, setPagination] = useState<Pagination>({
    ...PAGINATION_PRESET,
  })
  const [articles, setArticles] = useState<Article[]>([])
  const [tabIndex, setTabIndex] = useState(0)
  const [type, setType] = useState<Article["type"]>("newsfeed")
  const [since, setSince] = useState<Date | null>(null)
  const [until, setUntil] = useState<Date | null>(null)
  const [isOpenedDeleteDialog, setOpenedDeleteDialog] = useState(false)
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)
  const [order, setOrder] = useState<Order>("desc")
  const [orderBy, setOrderBy] = useState<keyof Article>("published_at")
  const [query, setQuery] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true)
      setHasError(false)
      try {
        const { page_size, page } = pagination
        const response = await articlesApi.get({
          status,
          type,
          page_size,
          page,
          order,
          orderBy,
        })
        setArticles([...response.data.data])
        setPagination({
          ...pagination,
          ...response.data.meta,
        })
      } catch {
        setHasError(true)
      }
      setDataLoading(false)
    }
    fetchData()
  }, [type, status, pagination.page_size, pagination.page, order, orderBy])

  useEffect(() => {
    setOrder("desc")
    setOrderBy("published_at")
    setTabIndex(0)
    setQuery("")
    setSince(null)
    setUntil(null)
  }, [status])

  useEffect(() => {
    setOrder("desc")
    setOrderBy("published_at")
    setQuery("")
    setSince(null)
    setUntil(null)
  }, [type])

  const handleDateStartChange = useMemo(
    () => (date: Date | null) => {
      setSince(date)
    },
    [setSince],
  )

  const handleDateEndChange = useMemo(
    () => (date: Date | null) => {
      setUntil(date)
    },
    [setUntil],
  )

  const handleChangeTab = useMemo(
    () => (event: ChangeEvent<{ id: Article["type"] }>, new_value: number) => {
      setType(event.currentTarget.id)
      setTabIndex(new_value)
    },
    [setTabIndex, setType],
  )

  const handleDeleteButtonClick = useMemo(
    () => (article: Article) => () => {
      setOpenedDeleteDialog(true)
      setCurrentArticle(article)
    },
    [setOpenedDeleteDialog, setCurrentArticle],
  )

  const handleConfirmDelete = useMemo(
    () => async () => {
      if (currentArticle) {
        try {
          await articlesApi.remove(currentArticle.id)
          setOpenedDeleteDialog(false)
          setArticles(articles.filter((item) => item.id !== currentArticle.id))
        } catch {
          setHasError(true)
        }
      }
    },
    [articles, currentArticle, setArticles, setOpenedDeleteDialog, setHasError],
  )

  const handleTablePageChange = useMemo(
    () => (
      _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      page: number,
    ) => {
      setPagination({
        ...pagination,
        page: page + 1,
      })
    },
    [pagination, setPagination],
  )

  const handleTableRowsPerPage = useMemo(
    () => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPagination({
        ...pagination,
        page: 1,
        page_size: parseInt(event.target.value, 10),
      })
    },
    [pagination, setPagination],
  )

  const handleFilterFormSubmit = useMemo(
    () => async (event: FormEvent) => {
      event.preventDefault()
      setDataLoading(true)
      setHasError(false)
      try {
        const { page_size, page } = pagination
        const response = await articlesApi.get({
          status,
          type,
          page_size,
          page,
          order,
          orderBy,
          since,
          until,
        })
        setArticles([...response.data.data])
      } catch {
        setHasError(true)
      }
      setDataLoading(false)
    },
    [
      type,
      status,
      since,
      until,
      setArticles,
      setDataLoading,
      setHasError,
      order,
      orderBy,
      pagination,
    ],
  )

  const handleResetFilterFormButtonClick = useMemo(
    () => async () => {
      setSince(null)
      setUntil(null)
      setDataLoading(true)
      setHasError(false)
      try {
        const { page, page_size } = pagination
        const response = await articlesApi.get({
          status,
          type,
          page_size,
          page,
          order,
          orderBy,
        })
        setArticles([...response.data.data])
      } catch {
        setHasError(true)
      }
      setDataLoading(false)
    },
    [
      status,
      type,
      order,
      orderBy,
      pagination,
      setSince,
      setUntil,
      setArticles,
      setHasError,
      setDataLoading,
    ],
  )

  const handleRequestSort = useMemo(
    () => (property: keyof Article) => {
      const isAsc = orderBy === property && order === "asc"
      setOrder(isAsc ? "desc" : "asc")
      setOrderBy(property)
    },
    [order, orderBy],
  )

  const doSearch = async (query: string) => {
    console.log(status, type)
    setDataLoading(true)
    setHasError(false)
    try {
      const params = {
        status,
        type,
        query,
      }
      const response = await articlesApi.search(params)
      setArticles([...response.data.data])
    } catch {
      setHasError(true)
    }
    setDataLoading(false)
  }

  const debounceOnChange = useCallback(debounce(doSearch, 500), [status, type])

  const handleChangeSearchInput = useMemo(
    () => (event: ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
      debounceOnChange(event.target.value)
    },
    [debounceOnChange, setQuery],
  )

  const title = useMemo(() => mapTitleByStatus[status], [status])

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Typography component="h1" variant="h4" gutterBottom={true}>
          {title}
        </Typography>
        <form onSubmit={handleFilterFormSubmit} noValidate={true}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
            <Toolbar disableGutters={true} className={classes.toolbar}>
              <FormControl margin="none" variant="outlined">
                <DateTimePicker
                  id="date-start"
                  ampm={false}
                  variant="dialog"
                  margin="none"
                  inputVariant="outlined"
                  label="Дата начала"
                  format="dd/MM/yyyy HH:mm"
                  size="small"
                  value={since}
                  onChange={handleDateStartChange}
                />
              </FormControl>
              <FormControl margin="none" variant="outlined">
                <DateTimePicker
                  id="date-end"
                  ampm={false}
                  variant="dialog"
                  margin="none"
                  inputVariant="outlined"
                  label="Дата окончания"
                  format="dd/MM/yyyy HH:mm"
                  size="small"
                  value={until}
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
              </ButtonGroup>
              <TextField
                autoComplete="off"
                type="text"
                value={query}
                variant="outlined"
                size="small"
                onChange={handleChangeSearchInput}
              />
            </Toolbar>
          </MuiPickersUtilsProvider>
        </form>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Tabs
            value={tabIndex}
            onChange={handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Коротко" id="newsfeed" />
            <Tab label="В Деталях" id="detailed" />
            <Tab label="Что в России" id="in-russia" />
            <Tab label="События" id="calendar" />
            <Tab label="Персона" id="people" />
            <Tab label="Исследования" id="research" />
            <Tab label="Биржевая аналитика" id="analysis" />
          </Tabs>
        </AppBar>
        {hasError ? (
          <Alert color="error">Произошла ошибка</Alert>
        ) : (
          <ArticlesTable
            data={articles}
            isDataLoading={isDataLoading}
            order={order}
            orderBy={orderBy}
            pagination={pagination}
            renderRow={(article) => (
              <ArticlesTableRow
                key={`article-${article.id}`}
                article={article}
                onDeleteRow={handleDeleteButtonClick(article)}
              />
            )}
            onRequestSort={handleRequestSort}
            onChangePage={handleTablePageChange}
            onChangeRowsPerPage={handleTableRowsPerPage}
          />
        )}
      </Container>
      {isOpenedDeleteDialog && (
        <DeleteDialog
          isOpened={isOpenedDeleteDialog}
          onCancel={() => setOpenedDeleteDialog(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </Fragment>
  )
}

const head_cells: import("@features/core").HeadCell<Article>[] = [
  {
    id: "title",
    sort_field: "title",
    label: "Заголовок",
    width: "35%",
  },
  {
    id: "authors",
    label: "Автор",
    width: "25%",
  },
  {
    id: "published_at",
    sort_field: "published_at",
    label: "Дата публикации",
    width: "10%",
  },
  {
    id: "updated_at",
    sort_field: "updated_at",
    label: "Обновлено",
    width: "10%",
  },
  {
    id: "total_views",
    sort_field: "total_views",
    label: "Просмотров",
    width: "1%",
    align: "right",
  },
  {
    id: "actions",
    label: "Действия",
    width: "15%",
    align: "right",
  },
]

type TablePageChangeAction = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  page: number,
) => void

type ArticlesTableProps = {
  data: Article[]
  isDataLoading: boolean
  order: Order
  orderBy: keyof Article
  pagination: Pagination
  renderRow: (article: Article) => ReactElement
  onChangePage: TablePageChangeAction
  onChangeRowsPerPage: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onRequestSort: (property: keyof Article) => void
}

const ArticlesTable = memo(function ArticlesTable(props: ArticlesTableProps) {
  const {
    data,
    isDataLoading,
    order,
    orderBy,
    pagination,
    renderRow,
    onChangePage,
    onChangeRowsPerPage,
    onRequestSort,
  } = props

  const classes = useStyles()

  const createSortHandler = useCallback(
    (property: keyof Article) => () => {
      onRequestSort(property)
    },
    [onRequestSort],
  )

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table stickyHeader={true}>
          <TableHead>
            <TableRow>
              {head_cells.map((head_cell) =>
                head_cell.sort_field ? (
                  <TableCell
                    key={head_cell.id}
                    align={head_cell.align}
                    sortDirection={
                      orderBy === head_cell.sort_field ? order : false
                    }
                    style={{ width: head_cell.width }}
                  >
                    <TableSortLabel
                      active={orderBy === head_cell.sort_field}
                      direction={
                        orderBy === head_cell.sort_field ? order : "asc"
                      }
                      onClick={createSortHandler(head_cell.sort_field)}
                      classes={{
                        root: classes.tableSortLabel,
                        active: classes.tableSortLabelActive,
                        icon: classes.tableSortLabelIcon,
                      }}
                    >
                      {head_cell.label}
                      {orderBy === head_cell.id ? (
                        <span className={classes.visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ) : (
                  <TableCell
                    key={head_cell.id}
                    align={head_cell.align}
                    style={{ width: head_cell.width }}
                  >
                    {head_cell.label}
                  </TableCell>
                ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {isDataLoading ? (
              <TableSkeleton colSpan={6} />
            ) : (
              <ConditionalList
                list={data}
                renderExists={(list) => (
                  <Fragment>
                    {list.map((article) => renderRow(article))}
                  </Fragment>
                )}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ConditionalList
        list={data}
        renderExists={() => (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            colSpan={3}
            count={pagination.total_items}
            rowsPerPage={Number(pagination.page_size)}
            page={pagination.page - 1}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        )}
      />
    </Fragment>
  )
})

type ArticlesTableRowProps = {
  article: Article
  onDeleteRow: () => void
}

const ArticlesTableRow = memo(function ArticlesTableRow(
  props: ArticlesTableRowProps,
) {
  const { article, onDeleteRow } = props

  return (
    <TableRow>
      <TableCell>
        {article.url ? (
          <Link href={article.url} target="_blank">
            {article.title}
          </Link>
        ) : (
          <Fragment>{article.title}</Fragment>
        )}
      </TableCell>
      <TableCell>
        {article.authors
          .reduce<string[]>((names, author) => [...names, author.name], [])
          .join(", ")}
      </TableCell>
      <TableCell nowrap="true">
        {article.published_at &&
          format(new Date(article.published_at), "dd.MM.yyyy HH:mm")}
      </TableCell>
      <TableCell nowrap="true">
        {article.updated_at &&
          format(new Date(article.updated_at), "dd.MM.yyyy HH:mm")}
      </TableCell>
      <TableCell align="right">{article.total_views}</TableCell>
      <TableCell align="right">
        <RouterLink
          routeName="admin.articles.edit"
          routeParams={{ id: article.id }}
        >
          <IconButton>
            <EditIcon color="action" />
          </IconButton>
        </RouterLink>
        <IconButton onClick={onDeleteRow}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
})
