import nanoid from "nanoid"
import React, { useState, useEffect, Fragment } from "react"
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
import { Alert, Skeleton } from "@material-ui/lab"
import { subscribersAPI, Subscriber } from "@api/subscribers"
import { ConditionalList } from "@ui"

export const SubscribersPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const response = await subscribersAPI.getLatest()
        setSubscribers(response.data.data)
      } catch {
        setError(true)
      }
      setLoading(false)
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
          {!error ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width="50%" component="th">
                      Email
                    </TableCell>
                    <TableCell width="50%" component="th">
                      Дата подписки
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!loading ? (
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
                  ) : (
                    <Fragment>
                      {Array.from({ length: 20 }).map(() => (
                        <TableRow key={nanoid()}>
                          <TableCell colSpan={2} padding="none">
                            <Skeleton
                              variant="rect"
                              width="100%"
                              height="53px"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </Fragment>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert color="error">Произошла ошибка</Alert>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}
