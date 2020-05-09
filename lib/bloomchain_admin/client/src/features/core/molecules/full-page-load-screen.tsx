import React, { memo } from "react"
import { makeStyles, createStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: "100vh",
    },
  }),
)

export const FullPageLoadScreen = memo(() => {
  const classes = useStyles()

  return (
    <Grid
      className={classes.root}
      container={true}
      alignItems="center"
      justify="center"
    >
      <CircularProgress color="primary" size={60} />
    </Grid>
  )
})
