import React, {
  memo,
  useState,
  useMemo,
  useEffect,
  ReactElement,
  Fragment,
  ChangeEvent,
} from "react"
import format from "date-fns/format"
import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableSortLabel,
  TablePagination,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { ConditionalList } from "@ui"
import { Order, Pagination } from "@api/common/types"
import { subscribersApi, Subscriber } from "@api/subscribers"
import { TableRow, TableCell, TableSkeleton } from "@features/core"

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      marginRight: theme.spacing(2),
    },
    table: {
      tableLayout: "fixed",
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    tableSortLabel: {
      "&:hover": {
        color: "rgba(255, 255, 255, 0.54) !important",
      },
    },
    tableSortLabelActive: {
      color: "#fff !important",
    },
    tableSortLabelIcon: {
      color: "rgba(255, 255, 255, 0.54) !important",
    },
  }),
)

const PAGINATION_PRESET = {
  page: 1,
  page_size: 20,
  total_pages: 1,
  total_items: 0,
}

export const SubscribersPage = () => {
  const classes = useStyles()

  const [isDataLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(false)
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    ...PAGINATION_PRESET,
  })
  const [order, setOrder] = useState<Order>("desc")
  const [orderBy, setOrderBy] = useState<keyof Subscriber>("inserted_at")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const { page_size, page } = pagination
        const response = await subscribersApi.get({
          page_size,
          page,
          order,
          orderBy,
        })
        setSubscribers(response.data.data)
        setPagination({
          ...pagination,
          ...response.data.meta,
        })
      } catch {
        setError(true)
      }
      setLoading(false)
    }
    fetchData()
  }, [pagination.page_size, pagination.page, order, orderBy])

  const handleTablePageChange = useMemo(
    () => (
      _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      page: number,
    ) => {
      setPagination({
        ...pagination,
        page: page + 1,
      })
    },
    [pagination, setPagination],
  )

  const handleTableRowsPerPage = useMemo(
    () => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPagination({
        ...pagination,
        page: 1,
        page_size: parseInt(event.target.value, 10),
      })
    },
    [pagination, setPagination],
  )

  const handleRequestSort = useMemo(
    () => (property: keyof Subscriber) => {
      const isAsc = orderBy === property && order === "asc"
      setOrder(isAsc ? "desc" : "asc")
      setOrderBy(property)
    },
    [order, orderBy],
  )

  return (
    <Container maxWidth="md">
      <Typography component="h1" variant="h4" className={classes.title}>
        Подписчики
      </Typography>
      {!hasError ? (
        <SubscribersTable
          data={subscribers}
          isDataLoading={isDataLoading}
          pagination={pagination}
          order={order}
          orderBy={orderBy}
          renderRow={(subscriber) => (
            <SubscribersTableRow key={subscriber.id} subscriber={subscriber} />
          )}
          onRequestSort={handleRequestSort}
          onChangePage={handleTablePageChange}
          onChangeRowsPerPage={handleTableRowsPerPage}
        />
      ) : (
        <Alert color="error">Произошла ошибка</Alert>
      )}
    </Container>
  )
}

type TablePageChangeAction = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  page: number,
) => void

const head_cells: import("@features/core").HeadCell<Subscriber>[] = [
  {
    id: "email",
    sort_field: "email",
    label: "Email",
    width: "50%",
  },
  {
    id: "inserted_at",
    sort_field: "inserted_at",
    label: "Дата подписки",
    width: "50%",
  },
]

type SubscribersTableProps = {
  data: Subscriber[]
  isDataLoading: boolean
  order: Order
  orderBy: keyof Subscriber
  pagination: Pagination
  renderRow: (subscriber: Subscriber) => ReactElement<SubscribersTableRowProps>
  onChangePage: TablePageChangeAction
  onChangeRowsPerPage: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onRequestSort: (property: keyof Subscriber) => void
}

const SubscribersTable = memo(function (props: SubscribersTableProps) {
  const classes = useStyles()
  const {
    order,
    orderBy,
    pagination,
    data,
    isDataLoading,
    renderRow,
    onChangePage,
    onChangeRowsPerPage,
    onRequestSort,
  } = props

  const createSortHandler = useMemo(
    () => (property: keyof Subscriber) => () => {
      onRequestSort(property)
    },
    [onRequestSort],
  )

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {head_cells.map((head_cell) => (
                <TableCell
                  key={head_cell.id}
                  align={head_cell.align}
                  sortDirection={
                    orderBy === head_cell.sort_field ? order : false
                  }
                  style={{ width: head_cell.width }}
                >
                  <TableSortLabel
                    active={orderBy === head_cell.sort_field}
                    direction={orderBy === head_cell.sort_field ? order : "asc"}
                    onClick={createSortHandler(
                      head_cell.sort_field ?? "inserted_at",
                    )}
                    classes={{
                      root: classes.tableSortLabel,
                      active: classes.tableSortLabelActive,
                      icon: classes.tableSortLabelIcon,
                    }}
                  >
                    {head_cell.label}
                    {orderBy === head_cell.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!isDataLoading ? (
              <ConditionalList
                list={data}
                renderExists={(list) => (
                  <Fragment>
                    {list.map((subscriber) => renderRow(subscriber))}
                  </Fragment>
                )}
              />
            ) : (
              <TableSkeleton
                colSpan={2}
                length={data.length || pagination.page_size}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ConditionalList
        list={data}
        renderExists={() => (
          <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
            component="div"
            count={pagination.total_items}
            rowsPerPage={Number(pagination.page_size)}
            page={pagination.page - 1}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        )}
      />
    </Fragment>
  )
})

type SubscribersTableRowProps = {
  subscriber: Subscriber
}

const SubscribersTableRow = memo(function ({
  subscriber,
}: SubscribersTableRowProps) {
  return (
    <TableRow>
      <TableCell>{subscriber.email}</TableCell>
      <TableCell>
        {format(new Date(subscriber.inserted_at), "dd.mm.yyyy HH:mm")}
      </TableCell>
    </TableRow>
  )
})
