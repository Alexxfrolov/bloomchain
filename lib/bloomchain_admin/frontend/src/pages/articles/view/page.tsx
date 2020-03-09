import nanoid from "nanoid"
import React, {
  Fragment,
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
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import format from "date-fns/format"
import {
  Grid,
  Container,
  AppBar,
  Tabs,
  Tab,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Typography,
  Button,
  Link,
  IconButton,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { articlesApi, Article } from "@api/articles"
import { Author } from "@api/authors"
import { ConditionalList } from "@ui"
import {
  RouterLink,
  DeleteDialog,
  TableRow,
  TableCell,
  TableSkeleton,
} from "@features/core"

const titles = {
  archive: "Архив",
  published: "Опубликовано",
  ready: "Готово к публикации",
  draft: "Черновик",
}

export const ArticlesViewPage = () => {
  const { route } = useRoute()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const status = useMemo(() => route.name.split(".")[2], [route.name])

  const [articles, setArticles] = useState<Article[]>([])
  const [tabIndex, setTabIndex] = useState(0)
  const [type, setType] = useState<Article["type"]>("newsfeed")
  const [dateStart, setDateStart] = useState<Date | null>(null)
  const [dateEnd, setDateEnd] = useState<Date | null>(null)
  const [openedDeleteDialog, setOpenedDeleteDialog] = useState(false)
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)
      try {
        const response = await articlesApi.getLatest(status, type)
        setArticles([...response.data.data])
      } catch {
        setError(true)
      }
      setLoading(false)
    }
    fetchData()
  }, [type, status])

  const handleDateStartChange = useCallback(
    (date: Date | null) => {
      setDateStart(date)
    },
    [setDateStart],
  )

  const handleDateEndChange = useCallback(
    (date: Date | null) => {
      setDateEnd(date)
    },
    [setDateEnd],
  )

  const handleChangeTab = useCallback(
    (event: ChangeEvent<{ id: Article["type"] }>, newValue: number) => {
      setType(event.currentTarget.id)
      setTabIndex(newValue)
    },
    [setTabIndex, setType],
  )

  const handleDeleteButtonClick = useCallback(
    (article: Article) => () => {
      setOpenedDeleteDialog(true)
      setCurrentArticle(article)
    },
    [setOpenedDeleteDialog, setCurrentArticle],
  )

  const handleConfirmDelete = useCallback(async () => {
    if (currentArticle) {
      try {
        await articlesApi.remove(currentArticle.id)
        setOpenedDeleteDialog(false)
        setArticles(articles.filter((item) => item.id !== currentArticle.id))
      } catch {
        setError(true)
      }
    }
  }, [articles, currentArticle, setArticles, setOpenedDeleteDialog, setError])

  const handleFilterFormSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      setLoading(true)
      setError(false)
      try {
        const response = await articlesApi.getByDate({
          type,
          status,
          dateStart,
          dateEnd,
        })
        setArticles([...response.data.data])
      } catch {
        setError(true)
      }
      setLoading(false)
    },
    [type, status, dateStart, dateEnd, setArticles, setLoading, setError],
  )

  const handleResetFilterFormButtonClick = useCallback(async () => {
    setDateStart(null)
    setDateEnd(null)
    setLoading(true)
    setError(false)
    try {
      const response = await articlesApi.getLatest(status, type)
      setArticles([...response.data.data])
    } catch {
      setError(true)
    }
    setLoading(false)
  }, [
    status,
    type,
    setDateStart,
    setDateEnd,
    setArticles,
    setError,
    setLoading,
  ])

  const title = useMemo(() => titles[status], [status])

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Grid container={true} spacing={3}>
          <Grid item={true} xs={12}>
            <Typography component="h1" variant="h4" gutterBottom={false}>
              {title}
            </Typography>
          </Grid>
          <Grid item={true} xs={12}>
            <form onSubmit={handleFilterFormSubmit}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container={true} spacing={4} alignItems="center">
                  <Grid item={true}>
                    <DatePicker
                      id="date-start"
                      variant="dialog"
                      margin="none"
                      fullWidth={true}
                      inputVariant="outlined"
                      label="Дата начала"
                      format="dd/MM/yyyy"
                      value={dateStart}
                      onChange={handleDateStartChange}
                    />
                  </Grid>
                  <Grid item={true}>
                    <DatePicker
                      id="date-end"
                      variant="dialog"
                      margin="none"
                      fullWidth={true}
                      inputVariant="outlined"
                      label="Дата окончания"
                      format="dd/MM/yyyy"
                      value={dateEnd}
                      onChange={handleDateEndChange}
                    />
                  </Grid>
                  <Grid item={true}>
                    <Button type="submit" variant="contained" color="primary">
                      Фильтровать
                    </Button>
                  </Grid>
                  <Grid item={true}>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={handleResetFilterFormButtonClick}
                    >
                      Сбросить фильтр
                    </Button>
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </form>
          </Grid>
          <Grid item={true} xs={12}>
            <AppBar position="static" color="default">
              <Tabs
                value={tabIndex}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="Коротко" id="newsfeed" />
                <Tab label="В Деталях" id="detailed" />
                <Tab label="Статистика" id="analysis" />
                <Tab label="Что в России" id="in_russia" />
                <Tab label="События" id="calendar" />
                <Tab label="Персона" id="person" />
              </Tabs>
            </AppBar>
          </Grid>
          {error ? (
            <Grid item={true} xs={12}>
              <Alert color="error">Произошла ошибка</Alert>
            </Grid>
          ) : (
            <ArticlesTable
              data={articles}
              loading={loading}
              renderRow={(article) => (
                <ArticlesTableRow
                  key={nanoid()}
                  article={article}
                  onDeleteRow={handleDeleteButtonClick(article)}
                />
              )}
            />
          )}
        </Grid>
      </Container>
      {openedDeleteDialog && (
        <DeleteDialog
          opened={openedDeleteDialog}
          onCancel={() => setOpenedDeleteDialog(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </Fragment>
  )
}

type ArticlesTableProps = {
  data: Article[]
  loading: boolean
  renderRow: (article: Article) => ReactElement
}

const ArticlesTable = ({ data, loading, renderRow }: ArticlesTableProps) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell width="35%" component="th">
            Заголовок
          </TableCell>
          <TableCell width="25%" component="th">
            Автор
          </TableCell>
          <TableCell width="10%" component="th">
            Дата публикации
          </TableCell>
          <TableCell width="10%" component="th">
            Обновлено
          </TableCell>
          <TableCell width="1%" component="th" align="right">
            Просмотров
          </TableCell>
          <TableCell width="15%" component="th" align="right">
            Действия
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? (
          <TableSkeleton colSpan={6} />
        ) : (
          <ConditionalList
            list={data}
            renderExists={(list) => (
              <Fragment>{list.map((article) => renderRow(article))}</Fragment>
            )}
          />
        )}
      </TableBody>
    </Table>
  </TableContainer>
)

type ArticlesTableRowProps = {
  article: Article
  onDeleteRow: () => void
}

const ArticlesTableRow = ({ article, onDeleteRow }: ArticlesTableRowProps) => (
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
        .reduce(
          (names: string[], author: Author) => [...names, author.name],
          [],
        )
        .join(", ")}
    </TableCell>
    <TableCell nowrap="true">
      {article.published_at &&
        format(new Date(article.published_at), "dd.MM.yyyy hh:mm")}
    </TableCell>
    <TableCell nowrap="true">
      {article.updated_at &&
        format(new Date(article.updated_at), "dd.MM.yyyy hh:mm")}
    </TableCell>
    <TableCell align="right">{article.total_views}</TableCell>
    <TableCell>
      <Grid container={true} spacing={2} justify="flex-end">
        <Grid item={true}>
          <RouterLink
            routeName="admin.articles.edit"
            routeParams={{ id: article.id }}
          >
            <IconButton edge="start">
              <EditIcon color="action" />
            </IconButton>
          </RouterLink>
        </Grid>
        <Grid item={true}>
          <IconButton edge="start" onClick={onDeleteRow}>
            <DeleteIcon color="error" />
          </IconButton>
        </Grid>
      </Grid>
    </TableCell>
  </TableRow>
)
