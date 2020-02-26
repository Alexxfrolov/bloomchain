import React, { useState, useCallback } from "react"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import {
  makeStyles,
  createStyles,
  GridList,
  GridListTile,
  Grid,
  Container,
  Paper,
  Typography,
  Button,
  IconButton,
  Theme,
} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"

import breakfast from "../../images/breakfast.jpg"
import burgers from "../../images/burgers.jpg"
import camera from "../../images/camera.jpg"
import hats from "../../images/hats.jpg"
import honey from "../../images/honey.jpg"
import morning from "../../images/morning.jpg"
import vegetables from "../../images/vegetables.jpg"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: "100%",
      height: 500,
    },
  }),
)

const tileData = [
  {
    img: breakfast,
    title: "Breakfast",
    author: "author",
    cols: 2,
  },
  {
    img: burgers,
    title: "Burgers",
    author: "author",
    cols: 1,
  },
  {
    img: camera,
    title: "Camera",
    author: "author",
    cols: 1,
  },
  {
    img: hats,
    title: "Hats",
    author: "author",
    cols: 1,
  },
  {
    img: honey,
    title: "Honey",
    author: "author",
    cols: 1,
  },
  {
    img: morning,
    title: "Morning",
    author: "author",
    cols: 1,
  },
  {
    img: vegetables,
    title: "Vegetables",
    author: "author",
    cols: 2,
  },
]

export const MediaPage = () => {
  const classes = useStyles()

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
          {/* <Button variant="contained" color="primary">
            Добавить
          </Button> */}
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
          <div className={classes.root}>
            <GridList cellHeight={300} className={classes.gridList} cols={3}>
              {tileData.map((tile) => (
                <GridListTile key={tile.img} cols={tile.cols || 1}>
                  <img src={tile.img} alt={tile.title} />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}
