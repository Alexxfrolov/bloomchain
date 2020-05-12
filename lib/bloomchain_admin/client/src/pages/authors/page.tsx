import React, {
  Fragment,
  memo,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactElement,
  ChangeEvent,
  FormEvent,
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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Toolbar,
  DialogActions,
  Button,
  IconButton,
  makeStyles,
  createStyles,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import AddBoxIcon from "@material-ui/icons/AddBox"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { ConditionalList } from "@ui"
import { OrderDirection, Pagination } from "@api/common/types"
import { authorsApi, Author } from "@api/authors"
import {
  DeleteDialog,
  TableSkeleton,
  TableRow,
  TableCell,
} from "@features/core"

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
      marginBottom: theme.spacing(2),
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

export const AuthorsPage = () => {
  const classes = useStyles()

  const [isDataLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(false)
  const [authors, setAuthors] = useState<Author[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    page_size: 25,
    page_size_options: [25, 50, 100],
    total_pages: 1,
    total_items: 0,
  })
  const [orderDirection, setOrderDirection] = useState<OrderDirection>("desc")
  const [orderBy, setOrderBy] = useState<keyof Author>("inserted_at")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const { page_size, page } = pagination
        const response = await authorsApi.get({
          page_size,
          page,
          orderDirection,
          orderBy,
        })
        setAuthors(response.data.data)
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
  }, [pagination.page_size, pagination.page, orderDirection, orderBy])

  const [modifyingAuthor, setModifyingAuthor] = useState<Author | null>(null)
  const [isOpenedAddFormDialog, setOpenedAddFormDialog] = useState(false)
  const [isOpenedEditFormDialog, setOpenedEditFormDialog] = useState(false)
  const [isOpenedDeleteDialog, setOpenedDeleteDialog] = useState(false)

  const openAddFormDialog = useMemo(
    () => () => {
      setOpenedAddFormDialog(true)
    },
    [setOpenedAddFormDialog],
  )

  const closeAddFormDialog = useMemo(
    () => () => {
      setOpenedAddFormDialog(false)
    },
    [setOpenedAddFormDialog],
  )

  const closeDeleteDialog = useMemo(
    () => () => {
      setOpenedDeleteDialog(false)
    },
    [setOpenedDeleteDialog],
  )

  const closeEditFormDialog = useMemo(
    () => () => {
      setOpenedEditFormDialog(false)
    },
    [setOpenedEditFormDialog],
  )

  const addAuthor = useMemo(
    () => (author: Author) => {
      setAuthors([author, ...authors])
    },
    [authors, setAuthors],
  )

  const editAuthor = useMemo(
    () => (modifedAuthor: Author) => {
      setAuthors(
        authors.reduce<Author[]>(
          (authors, author) => [
            ...authors,
            author.id !== modifedAuthor.id ? author : modifedAuthor,
          ],
          [],
        ),
      )
    },
    [authors, setAuthors],
  )

  const handleConfirmDelete = useMemo(
    () => async () => {
      if (modifyingAuthor) {
        try {
          await authorsApi.remove(modifyingAuthor.id)
          setOpenedDeleteDialog(false)
          setAuthors(authors.filter((item) => item.id !== modifyingAuthor.id))
        } catch {
          setError(true)
        }
      }
    },
    [authors, modifyingAuthor, setAuthors, setOpenedDeleteDialog],
  )

  const handleDeleteButtonClick = useMemo(
    () => (author: Author) => async () => {
      setOpenedDeleteDialog(true)
      setModifyingAuthor(author)
    },
    [setModifyingAuthor, setOpenedDeleteDialog],
  )

  const handleClickEditButton = useMemo(
    () => (author: Author) => async () => {
      setOpenedEditFormDialog(true)
      setModifyingAuthor(author)
    },
    [setModifyingAuthor, setOpenedEditFormDialog],
  )

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
    () => (property: keyof Author) => {
      const isAsc = orderBy === property && orderDirection === "asc"
      setOrderDirection(isAsc ? "desc" : "asc")
      setOrderBy(property)
    },
    [orderDirection, orderBy],
  )

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Toolbar disableGutters={true} className={classes.toolbar}>
          <Typography component="h1" variant="h4" className={classes.title}>
            Авторы
          </Typography>
          <IconButton
            edge="end"
            onClick={openAddFormDialog}
            aria-label="add author"
          >
            <AddBoxIcon color="primary" />
          </IconButton>
        </Toolbar>
        {!hasError ? (
          <AuthorsTable
            data={authors}
            isDataLoading={isDataLoading}
            pagination={pagination}
            orderDirection={orderDirection}
            orderBy={orderBy}
            renderRow={(author) => (
              <AuthorsTableRow
                key={author.id}
                author={author}
                onDetete={handleDeleteButtonClick(author)}
                onEdit={handleClickEditButton(author)}
              />
            )}
            onRequestSort={handleRequestSort}
            onChangePage={handleTablePageChange}
            onChangeRowsPerPage={handleTableRowsPerPage}
          />
        ) : (
          <Alert color="error">Произошла ошибка</Alert>
        )}
      </Container>
      {isOpenedAddFormDialog && (
        <AddAuthorFormDialog
          isOpened={isOpenedAddFormDialog}
          onClose={closeAddFormDialog}
          onAddUser={addAuthor}
        />
      )}
      {isOpenedDeleteDialog && (
        <DeleteDialog
          isOpened={isOpenedDeleteDialog}
          onCancel={closeDeleteDialog}
          onConfirm={handleConfirmDelete}
        />
      )}
      {modifyingAuthor && isOpenedEditFormDialog && (
        <EditAuthorFormDialog
          editableUser={modifyingAuthor}
          isOpened={isOpenedEditFormDialog}
          onClose={closeEditFormDialog}
          onEditUser={editAuthor}
        />
      )}
    </Fragment>
  )
}

type TablePageChangeAction = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  page: number,
) => void

const head_cells: import("@features/core").HeadCell<Author>[] = [
  {
    id: "name",
    sort_field: "name",
    label: "Имя",
    width: "50%",
  },
  {
    id: "inserted_at",
    sort_field: "inserted_at",
    label: "Дата создания",
    width: "35%",
  },
  {
    id: "actions",
    label: "Действия",
    width: "15%",
  },
]

type AuthorsTableProps = {
  data: Author[]
  isDataLoading: boolean
  orderDirection: OrderDirection
  orderBy: keyof Author
  pagination: Pagination
  renderRow: (author: Author) => ReactElement<AuthorsTableRowProps>
  onChangePage: TablePageChangeAction
  onChangeRowsPerPage: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onRequestSort: (property: keyof Author) => void
}

const AuthorsTable = memo(function (props: AuthorsTableProps) {
  const classes = useStyles()
  const {
    orderDirection,
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
    () => (property: keyof Author) => () => {
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
                    orderBy === head_cell.sort_field ? orderDirection : false
                  }
                  style={{ width: head_cell.width }}
                >
                  <TableSortLabel
                    active={orderBy === head_cell.sort_field}
                    direction={
                      orderBy === head_cell.sort_field ? orderDirection : "asc"
                    }
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
                        {orderDirection === "desc"
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
                  <Fragment>{list.map((author) => renderRow(author))}</Fragment>
                )}
              />
            ) : (
              <TableSkeleton
                colSpan={6}
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
            rowsPerPageOptions={[25, 50, 100]}
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

type AuthorsTableRowProps = {
  author: Author
  onDetete: () => void
  onEdit: () => void
}

const AuthorsTableRow = memo(function ({
  author,
  onDetete,
  onEdit,
}: AuthorsTableRowProps) {
  return (
    <TableRow>
      <TableCell>{author.name}</TableCell>
      <TableCell>
        {format(new Date(author.inserted_at), "dd.mm.yyyy HH:mm")}
      </TableCell>
      <TableCell padding="none">
        <Toolbar disableGutters={true}>
          {author.editable && (
            <IconButton onClick={onEdit}>
              <EditIcon color="action" />
            </IconButton>
          )}
          {author.deletable && (
            <IconButton onClick={onDetete}>
              <DeleteIcon color="error" />
            </IconButton>
          )}
        </Toolbar>
      </TableCell>
    </TableRow>
  )
})

type AddAuthorFormDialogProps = {
  isOpened: boolean
  onClose: () => void
  onAddUser: (author: Author) => void
}

const AddAuthorFormDialog = ({
  isOpened,
  onAddUser,
  onClose,
}: AddAuthorFormDialogProps) => {
  const [name, setName] = useState("")

  const handleChangeTextField = useCallback(
    (event: ChangeEvent<{ value: string }>) => {
      setName(event.currentTarget.value)
    },
    [setName],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      try {
        const response = await authorsApi.create(name)
        onClose()
        onAddUser(response.data)
      } catch {}
    },
    [name, onAddUser, onClose],
  )

  return (
    <Dialog
      maxWidth="md"
      open={isOpened}
      onClose={onClose}
      aria-labelledby="add-author-form-dialog"
    >
      <form onSubmit={handleSubmit} noValidate={true}>
        <DialogTitle id="add-author-form-dialog">
          Добавление нового автора
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Имя"
            type="text"
            value={name}
            fullWidth={true}
            variant="outlined"
            margin="normal"
            onChange={handleChangeTextField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Отменить
          </Button>
          <Button type="submit" color="primary">
            Добавить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

type EditAuthorFormDialogProps = {
  editableUser: Author
  isOpened: boolean
  onClose: () => void
  onEditUser: (author: Author) => void
}

const EditAuthorFormDialog = ({
  editableUser,
  isOpened,
  onEditUser,
  onClose,
}: EditAuthorFormDialogProps) => {
  const [author, setAuthor] = useState<Author>({ ...editableUser })

  const handleChangeTextField = useCallback(
    (field: keyof Author) => (event: ChangeEvent<{ value: string }>) => {
      setAuthor({ ...author, [field]: event.currentTarget.value })
    },
    [author, setAuthor],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      try {
        const response = await authorsApi.update(author)
        onClose()
        onEditUser(response.data)
      } catch {}
    },
    [author, onEditUser, onClose],
  )

  return (
    <Dialog
      maxWidth="md"
      open={isOpened}
      onClose={onClose}
      aria-labelledby="edit-author-form-dialog"
    >
      <form onSubmit={handleSubmit} noValidate={true}>
        <DialogTitle id="edit-author-form-dialog">
          Редактирование автора
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Имя"
            type="text"
            value={author.name}
            fullWidth={true}
            required={true}
            variant="outlined"
            margin="normal"
            onChange={handleChangeTextField("name")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Отменить
          </Button>
          <Button type="submit" color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
