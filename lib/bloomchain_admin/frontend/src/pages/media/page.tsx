import React from "react"
import { Grid, Container, Typography, Button } from "@material-ui/core"

export const MediaPage = () => {
  return (
    <Container maxWidth="md">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <Typography component="h1" variant="h4" gutterBottom={false}>
            Медиа
          </Typography>
        </Grid>
        <Grid item={true} xs={12}>
          <Button variant="contained" color="primary">
            Загрузить
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
