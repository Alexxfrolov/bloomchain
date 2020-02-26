import nanoid from "nanoid"
import React, { useState, useEffect } from "react"
import {
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
} from "@material-ui/core"
import { subscribersAPI, Subscriber } from "@api/subscribers"
import { ConditionalList } from "@ui"
// import Pagination from "@material-ui/lab/Pagination"

export const SubscribersPage = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await subscribersAPI.getLatest()
        setSubscribers(response.data.data)
      } catch {}
    }
    fetchData()
  }, [])

  return (
    <Container maxWidth="md">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <Typography component="h1" variant="h4" gutterBottom={false}>
            Подписчики
          </Typography>
        </Grid>
        <Grid item={true} xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell component="th">Email</TableCell>
                  <TableCell component="th">Дата подписки</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <ConditionalList
                  list={subscribers}
                  renderExists={(list) =>
                    list.map((subscriber) => (
                      <TableRow key={nanoid()}>
                        <TableCell>{subscriber.email}</TableCell>
                        <TableCell>{subscriber.created_at}</TableCell>
                      </TableRow>
                    ))
                  }
                />
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
