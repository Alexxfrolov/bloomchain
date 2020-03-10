import React, { useState, useEffect, ReactElement, Fragment } from "react"
import format from "date-fns/format"
import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Typography,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { ConditionalList } from "@ui"
import { subscribersAPI, Subscriber } from "@api/subscribers"
import { TableRow, TableCell, TableSkeleton } from "@features/core"

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
      <Typography component="h1" variant="h4" gutterBottom={true}>
        Подписчики
      </Typography>
      {!error ? (
        <SubscribersTable
          data={subscribers}
          loading={loading}
          renderRow={(subscriber) => (
            <SubscribersTableRow key={subscriber.id} subscriber={subscriber} />
          )}
        />
      ) : (
        <Alert color="error">Произошла ошибка</Alert>
      )}
    </Container>
  )
}

type SubscribersTableProps = {
  data: Subscriber[]
  loading: boolean
  renderRow: (subscriber: Subscriber) => ReactElement<SubscribersTableRowProps>
}

const SubscribersTable = ({
  data,
  loading,
  renderRow,
}: SubscribersTableProps) => (
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
            list={data}
            renderExists={(list) => (
              <Fragment>
                {list.map((subscriber) => renderRow(subscriber))}
              </Fragment>
            )}
          />
        ) : (
          <TableSkeleton colSpan={2} />
        )}
      </TableBody>
    </Table>
  </TableContainer>
)

type SubscribersTableRowProps = {
  subscriber: Subscriber
}

const SubscribersTableRow = ({ subscriber }: SubscribersTableRowProps) => (
  <TableRow>
    <TableCell>{subscriber.email}</TableCell>
    <TableCell>
      {subscriber.created_at &&
        format(new Date(subscriber.created_at), "dd.mm.yyyy hh:mm")}
    </TableCell>
  </TableRow>
)
