import React, { ReactNode } from "react"
import { makeStyles, createStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: "100vh",
    },
  }),
)

type CenteredTemplateProps = {
  children: ReactNode | ReactNode[]
}

export const CenteredTemplate = ({ children }: CenteredTemplateProps) => {
  const classes = useStyles()

  return (
    <Grid
      className={classes.root}
      container={true}
      alignItems="center"
      justify="center"
    >
      {children}
    </Grid>
  )
}
