import nanoid from "nanoid"
import React, { useState, useEffect, Fragment } from "react"
import format from "date-fns/format"
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
  withStyles,
  createStyles,
  Theme,
} from "@material-ui/core"
import { Alert, Skeleton } from "@material-ui/lab"
import { ConditionalList } from "@ui"
import { subscribersAPI, Subscriber } from "@api/subscribers"

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
                    <StyledTableCell width="50%" component="th">
                      Email
                    </StyledTableCell>
                    <StyledTableCell width="50%" component="th">
                      Дата подписки
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!loading ? (
                    <ConditionalList
                      list={subscribers}
                      renderExists={(list) =>
                        list.map((subscriber) => (
                          <StyledTableRow key={nanoid()}>
                            <StyledTableCell>
                              {subscriber.email}
                            </StyledTableCell>
                            <StyledTableCell>
                              {format(
                                new Date(subscriber.created_at),
                                "dd.mm.yyyy hh:mm",
                              )}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))
                      }
                    />
                  ) : (
                    <Fragment>
                      {Array.from({ length: 20 }).map(() => (
                        <StyledTableRow key={nanoid()}>
                          <StyledTableCell colSpan={2} padding="none">
                            <Skeleton
                              variant="rect"
                              width="100%"
                              height="53px"
                            />
                          </StyledTableCell>
                        </StyledTableRow>
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
