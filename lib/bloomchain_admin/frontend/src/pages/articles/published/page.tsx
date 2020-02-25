import nanoid from "nanoid"
import React, { useState, useEffect, useCallback, ChangeEvent } from "react"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
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
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { articlesAPI, Article } from "@api/articles"
import { RouterLink } from "@features/core"

export const ArticlesPublishedPage = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [tabIndex, setTabIndex] = useState(0)
  const [type, setType] = useState<Article["type"]>("newsfeed")
  const [dateStart, setDateStart] = useState<Date | null>(null)
  const [dateEnd, setDateEnd] = useState<Date | null>(new Date())

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await articlesAPI.getLatest(type, "published")
        setArticles(response.data.data)
      } catch {}
    }
    fetchData()
  }, [type])

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

  const handleClickDeleteButton = useCallback(
    (id: number) => async () => {
      await articlesAPI.remove(id)
    },
    [],
  )

  return (
    <Container maxWidth="lg">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <Typography component="h1" variant="h4" gutterBottom={false}>
            Опубликовано
          </Typography>
        </Grid>
        <Grid item={true} xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container={true} spacing={4} alignItems="center">
              <Grid item={true}>
                <KeyboardDatePicker
                  variant="dialog"
                  margin="normal"
                  id="date-start"
                  label="Дата начал"
                  format="dd/MM/yyyy"
                  value={dateStart}
                  onChange={handleDateStartChange}
                  KeyboardButtonProps={{
                    "aria-label": "Выберите дату",
                  }}
                />
              </Grid>
              <Grid item={true}>
                <KeyboardDatePicker
                  variant="dialog"
                  margin="normal"
                  id="date-end"
                  label="Дата окончания"
                  format="dd/MM/yyyy"
                  value={dateEnd}
                  onChange={handleDateEndChange}
                  KeyboardButtonProps={{
                    "aria-label": "Выберите дату",
                  }}
                />
              </Grid>
              <Grid item={true}>
                <Button variant="contained" color="primary" component="span">
                  Фильтровать
                </Button>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell component="th">Автор</TableCell>
                  <TableCell component="th">Дата публикации</TableCell>
                  <TableCell component="th">
                    Дата последнего обновления
                  </TableCell>
                  <TableCell component="th">Заголовок</TableCell>
                  <TableCell component="th" align="right">
                    Кол-во просмотров
                  </TableCell>
                  <TableCell component="th">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={nanoid()}>
                    <TableCell>{article.author}</TableCell>
                    <TableCell>{article.published_at}</TableCell>
                    <TableCell>{article.updated_at}</TableCell>
                    <TableCell>{article.title}</TableCell>
                    <TableCell align="right">{article.views_count}</TableCell>
                    <TableCell>
                      <Grid container={true} spacing={1}>
                        <IconButton
                          edge="start"
                          color="inherit"
                          component={(props) => (
                            <RouterLink
                              routeName="admin.articles.edit"
                              routeParams={{ id: article.id }}
                              {...props}
                            />
                          )}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={handleClickDeleteButton(article.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {/* <Grid item={true} xs={12} container={true} justify="center">
          <Pagination count={10} color="primary" />
        </Grid> */}
      </Grid>
    </Container>
  )
}
