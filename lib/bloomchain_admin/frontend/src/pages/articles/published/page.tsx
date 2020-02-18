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
import { articleApi, Article } from "@api/articles"

export const ArticlesPublishedPage = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [type, setType] = useState<Article["type"]>("newsfeed")
  const [dateStart, setDateStart] = useState<Date | null>(null)
  const [dateEnd, setDateEnd] = useState<Date | null>(new Date())

  useEffect(() => {
    articleApi.get()
  }, [])

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
            <Table aria-label="published articles table">
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
                <TableRow>
                  <TableCell>Admin</TableCell>
                  <TableCell>06.12.2019 в 12:02</TableCell>
                  <TableCell>21.01.2020 в 20:05 </TableCell>
                  <TableCell>
                    Совет ЕС определил стратегические приоритеты борьбы против
                    финансирования терроризма
                  </TableCell>
                  <TableCell align="right">5</TableCell>
                  <TableCell>
                    <Grid container={true} spacing={1}>
                      <IconButton edge="start" color="inherit">
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="start" color="inherit">
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item={true} xs={12} container={true} justify="center">
          <Pagination count={10} color="primary" />
        </Grid>
      </Grid>
    </Container>
  )
}
