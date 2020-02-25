import React, { useState, useCallback } from "react"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import {
  withStyles,
  createStyles,
  Grid,
  Container,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  IconButton,
  Theme,
} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default,
      },
    },
  }),
)(TableRow)

export const MediaPage = () => {
  const [dateStart, setDateStart] = useState<Date | null>(null)
  const [dateEnd, setDateEnd] = useState<Date | null>(new Date())

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

  return (
    <Container maxWidth="lg">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12} container={true} justify="space-between">
          <Typography component="h1" variant="h4" gutterBottom={false}>
            Медиа
          </Typography>
          <Button variant="contained" color="primary">
            Добавить
          </Button>
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
          <TableContainer component={Paper}>
            {/* <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell component="th">Миниатюра</StyledTableCell>
                  <StyledTableCell component="th">PDF</StyledTableCell>
                  <StyledTableCell component="th">Действия</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>
                    <Grid container={true} spacing={1}>
                      <IconButton edge="start" color="inherit">
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="start" color="inherit">
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table> */}
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  )
}
