import React from "react"
import { Grid, Container, Typography } from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination"

export const ResearchPage = () => {
  return (
    <Container maxWidth="md">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <Typography component="h1" variant="h4" gutterBottom={false}>
            Исследования
          </Typography>
        </Grid>
        <Grid item={true} xs={12} container={true} justify="center">
          <Pagination count={10} color="primary" />
        </Grid>
      </Grid>
    </Container>
  )
}
