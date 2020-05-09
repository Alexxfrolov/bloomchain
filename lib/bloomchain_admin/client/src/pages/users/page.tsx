import React, {
  Fragment,
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactElement,
  ChangeEvent,
  FormEvent,
  RefObject,
} from "react"
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
  DialogActions,
  Button,
  IconButton,
  FormControl,
  Toolbar,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  createStyles,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import AddBoxIcon from "@material-ui/icons/AddBox"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { ConditionalList } from "@ui"
import { Order, Pagination } from "@api/common/types"
import { usersApi, User } from "@api/user"
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

const PAGINATION_PRESET = {
  page: 1,
  page_size: 25,
  total_pages: 1,
  total_items: 0,
}

export const UsersPage = () => {
  const classes = useStyles()
  const [isDataLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    ...PAGINATION_PRESET,
  })
  const [order, setOrder] = useState<Order>("desc")
  const [orderBy, setOrderBy] = useState<keyof User>("inserted_at")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const { page_size, page } = pagination
        const response = await usersApi.get({
          page_size,
          page,
          order,
          orderBy,
        })
        setUsers(response.data.data)
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

  const [modifyingUser, setModifyingUser] = useState<User | null>(null)
  const [isOpenedAddFormDialog, setOpenedAddFormDialog] = useState(false)
  const [isOpenedEditFormDialog, setOpenedEditFormDialog] = useState(false)
  const [isOpenedDeleteDialog, setOpenedDeleteDialog] = useState(false)

  const openAddFormDialog = useCallback(() => {
    setOpenedAddFormDialog(true)
  }, [setOpenedAddFormDialog])

  const closeAddFormDialog = useCallback(() => {
    setOpenedAddFormDialog(false)
  }, [setOpenedAddFormDialog])

  const closeDeleteDialog = useCallback(() => {
    setOpenedDeleteDialog(false)
  }, [setOpenedDeleteDialog])

  const closeEditFormDialog = useCallback(() => {
    setOpenedEditFormDialog(false)
  }, [setOpenedEditFormDialog])

  const addUser = useCallback(
    (user: User) => {
      setUsers([user, ...users])
    },
    [users, setUsers],
  )

  const editUser = useCallback(
    (modifedUser: User) => {
      setUsers(
        users.reduce<User[]>(
          (users, user) => [
            ...users,
            user.id !== modifedUser.id ? user : modifedUser,
          ],
          [],
        ),
      )
    },
    [users, setUsers],
  )

  const handleConfirmDelete = useCallback(async () => {
    if (modifyingUser) {
      try {
        await usersApi.remove(modifyingUser.id)
        setOpenedDeleteDialog(false)
        setUsers(users.filter((item) => item.id !== modifyingUser.id))
      } catch {
        setError(true)
      }
    }
  }, [users, modifyingUser, setUsers, setOpenedDeleteDialog])

  const handleDeleteButtonClick = useCallback(
    (user: User) => async () => {
      setOpenedDeleteDialog(true)
      setModifyingUser(user)
    },
    [setModifyingUser, setOpenedDeleteDialog],
  )

  const handleClickEditButton = useCallback(
    (user: User) => async () => {
      setOpenedEditFormDialog(true)
      setModifyingUser(user)
    },
    [setModifyingUser, setOpenedEditFormDialog],
  )

  const handleTablePageChange = useCallback(
    (
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

  const handleTableRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPagination({
        ...pagination,
        page: 1,
        page_size: parseInt(event.target.value, 10),
      })
    },
    [pagination, setPagination],
  )

  const handleRequestSort = useCallback(
    (property: keyof User) => {
      const isAsc = orderBy === property && order === "asc"
      setOrder(isAsc ? "desc" : "asc")
      setOrderBy(property)
    },
    [order, orderBy],
  )

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Toolbar disableGutters={true} className={classes.toolbar}>
          <Typography component="h1" variant="h4" className={classes.title}>
            Пользователи
          </Typography>
          <IconButton
            edge="end"
            onClick={openAddFormDialog}
            aria-label="add user"
          >
            <AddBoxIcon color="primary" />
          </IconButton>
        </Toolbar>
        {!hasError ? (
          <UsersTable
            data={users}
            isDataLoading={isDataLoading}
            pagination={pagination}
            order={order}
            orderBy={orderBy}
            renderRow={(user) => (
              <UsersTableRow
                key={user.id}
                user={user}
                onDetete={handleDeleteButtonClick(user)}
                onEdit={handleClickEditButton(user)}
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
        <AddUserFormDialog
          isOpened={isOpenedAddFormDialog}
          onClose={closeAddFormDialog}
          onAddUser={addUser}
        />
      )}
      {isOpenedDeleteDialog && (
        <DeleteDialog
          isOpened={isOpenedDeleteDialog}
          onCancel={closeDeleteDialog}
          onConfirm={handleConfirmDelete}
        />
      )}
      {modifyingUser && isOpenedEditFormDialog && (
        <EditUserFormDialog
          editableUser={modifyingUser}
          isOpened={isOpenedEditFormDialog}
          onClose={closeEditFormDialog}
          onEditUser={editUser}
        />
      )}
    </Fragment>
  )
}

const head_cells: import("@features/core").HeadCell<User>[] = [
  {
    id: "first_name",
    sort_field: "first_name",
    label: "Имя",
    width: "1%",
  },
  {
    id: "last_name",
    sort_field: "last_name",
    label: "Фамилия",
    width: "1%",
  },
  {
    id: "role",
    sort_field: "role",
    label: "Роль",
    width: "1%",
  },
  {
    id: "job",
    sort_field: "job",
    label: "Должность",
    width: "1%",
  },
  {
    id: "phone",
    label: "Телефон",
    width: "1%",
  },
  {
    id: "email",
    label: "E-mail",
    width: "1%",
  },
  {
    id: "actions",
    label: "Действия",
    width: "1%",
    align: "right",
  },
]

type TablePageChangeAction = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  page: number,
) => void

type UsersTableProps = {
  data: User[]
  isDataLoading: boolean
  order: Order
  orderBy: keyof User
  pagination: Pagination
  renderRow: (user: User) => ReactElement<UsersTableRowProps>
  onChangePage: TablePageChangeAction
  onChangeRowsPerPage: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onRequestSort: (property: keyof User) => void
}

const UsersTable = memo(function (props: UsersTableProps) {
  const {
    data,
    isDataLoading,
    order,
    orderBy,
    pagination,
    renderRow,
    onChangePage,
    onChangeRowsPerPage,
    onRequestSort,
  } = props

  const classes = useStyles()

  const createSortHandler = useCallback(
    (property: keyof User) => () => {
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
              {head_cells.map((head_cell) =>
                head_cell.sort_field ? (
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
                      direction={
                        orderBy === head_cell.sort_field ? order : "asc"
                      }
                      onClick={createSortHandler(head_cell.sort_field)}
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
                ) : (
                  <TableCell
                    key={head_cell.id}
                    align={head_cell.align}
                    style={{ width: head_cell.width }}
                  >
                    {head_cell.label}
                  </TableCell>
                ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!isDataLoading ? (
              <ConditionalList
                list={data}
                renderExists={(list) => (
                  <Fragment>{list.map((user) => renderRow(user))}</Fragment>
                )}
              />
            ) : (
              <TableSkeleton
                colSpan={7}
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

type UsersTableRowProps = {
  user: User
  onDetete: () => void
  onEdit: () => void
}

const UsersTableRow = memo(function (props: UsersTableRowProps) {
  const { user, onDetete, onEdit } = props
  return (
    <TableRow>
      <TableCell>{user.first_name}</TableCell>
      <TableCell>{user.last_name}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>{user.job}</TableCell>
      <TableCell>{user.phone}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell align="right">
        <Toolbar disableGutters={true}>
          <IconButton onClick={onEdit}>
            <EditIcon color="action" />
          </IconButton>
          <IconButton onClick={onDetete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Toolbar>
      </TableCell>
    </TableRow>
  )
})

type AddUserFormDialogProps = {
  isOpened: boolean
  onClose: () => void
  onAddUser: (user: User) => void
}

const AddUserFormDialog = memo(function (props: AddUserFormDialogProps) {
  const { isOpened, onAddUser, onClose } = props

  const [user, setUser] = useState<
    Omit<User, "inserted_at" | "updated_at" | "inserted_at" | "id">
  >({
    first_name: "",
    last_name: "",
    role: "writer",
    job: "",
    phone: "",
    email: "",
    password: "",
  })

  const labelRef: RefObject<HTMLLabelElement> = useRef(null)
  const [labelWidth, setSelectRoleLabelWidth] = useState(0)

  useEffect(() => {
    setSelectRoleLabelWidth(labelRef.current?.offsetWidth ?? 0)
  }, [labelRef])

  const handleChangeTextField = useCallback(
    (field: keyof User) => (event: ChangeEvent<{ value: string }>) => {
      setCustomValidity(event)
      setUser({ ...user, [field]: event.currentTarget.value })
    },
    [user, setUser],
  )

  const handleChangeSelect = useCallback(
    (
      event: ChangeEvent<{ name?: string | undefined; value: User["role"] }>,
    ) => {
      setUser({ ...user, role: event.target.value })
    },
    [user, setUser],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      try {
        const response = await usersApi.create(user)
        onClose()
        onAddUser(response.data)
      } catch {}
    },
    [user, onAddUser, onClose],
  )

  return (
    <Dialog
      maxWidth="md"
      open={isOpened}
      onClose={onClose}
      aria-labelledby="add-user-form-dialog"
    >
      <form onSubmit={handleSubmit} noValidate={true}>
        <DialogTitle id="add-user-form-dialog">
          Создание нового пользователя
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Имя"
            type="text"
            required={true}
            value={user.first_name}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onInvalid={setCustomValidity}
            onChange={handleChangeTextField("first_name")}
          />
          <TextField
            label="Фамилия"
            type="text"
            required={true}
            value={user.last_name}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onInvalid={setCustomValidity}
            onChange={handleChangeTextField("last_name")}
          />
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <InputLabel ref={labelRef} id="type">
              Роль
            </InputLabel>
            <Select
              labelId="type"
              id="type"
              labelWidth={labelWidth}
              value={user.role}
              onChange={handleChangeSelect}
            >
              <MenuItem value="writer">Автор</MenuItem>
              <MenuItem value="admin">Админ</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Должность"
            type="text"
            value={user.job}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChangeTextField("job")}
          />
          <TextField
            label="Телефон"
            type="tel"
            value={user.phone}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChangeTextField("phone")}
          />
          <TextField
            label="Email"
            type="email"
            required={true}
            value={user.email}
            autoComplete="new-email"
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onInvalid={setCustomValidity}
            onChange={handleChangeTextField("email")}
          />
          <TextField
            label="Пароль"
            type="password"
            required={true}
            value={user.password}
            autoComplete="new-password"
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onInvalid={setCustomValidity}
            onChange={handleChangeTextField("password")}
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
})

type EditUserFormDialogProps = {
  editableUser: User
  isOpened: boolean
  onClose: () => void
  onEditUser: (user: User) => void
}

const EditUserFormDialog = memo(function (props: EditUserFormDialogProps) {
  const { editableUser, isOpened, onEditUser, onClose } = props
  const [user, setUser] = useState<User>({ ...editableUser })

  const labelRef: RefObject<HTMLLabelElement | null> = useRef(null)
  const [labelWidth, setSelectRoleLabelWidth] = useState(0)

  useEffect(() => {
    setSelectRoleLabelWidth(labelRef.current?.offsetWidth ?? 0)
  }, [])

  const handleChangeTextField = useCallback(
    (field: keyof User) => (event: ChangeEvent<{ value: string }>) => {
      setUser({ ...user, [field]: event.currentTarget.value })
    },
    [user, setUser],
  )

  const handleChangeSelect = useCallback(
    (
      event: ChangeEvent<{ name?: string | undefined; value: User["role"] }>,
    ) => {
      setUser({ ...user, role: event.target.value })
    },
    [user, setUser],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      try {
        const response = await usersApi.update(user)
        onClose()
        onEditUser(response.data)
      } catch {}
    },
    [user, onEditUser, onClose],
  )

  return (
    <Dialog
      maxWidth="md"
      open={isOpened}
      onClose={onClose}
      aria-labelledby="add-user-form-dialog"
    >
      <form onSubmit={handleSubmit} noValidate={true}>
        <DialogTitle id="add-user-form-dialog">
          Редактирование пользователя
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Имя"
            type="text"
            required={true}
            value={user.first_name}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onInvalid={setCustomValidity}
            onChange={handleChangeTextField("first_name")}
          />
          <TextField
            label="Фамилия"
            type="text"
            required={true}
            value={user.last_name}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onInvalid={setCustomValidity}
            onChange={handleChangeTextField("last_name")}
          />
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <InputLabel ref={labelRef} id="role">
              Роль
            </InputLabel>
            <Select
              labelId="role"
              id="role"
              labelWidth={labelWidth}
              value={user.role}
              onChange={handleChangeSelect}
            >
              <MenuItem value="writer">Автор</MenuItem>
              <MenuItem value="admin">Админ</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Должность"
            type="text"
            value={user.job ?? ""}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChangeTextField("job")}
          />
          <TextField
            label="Телефон"
            type="tel"
            value={user.phone ?? ""}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChangeTextField("phone")}
          />
          <TextField
            label="Email"
            type="email"
            required={true}
            value={user.email}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onInvalid={setCustomValidity}
            onChange={handleChangeTextField("email")}
          />
          <TextField
            label="Пароль"
            type="password"
            value={user.password ?? ""}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChangeTextField("password")}
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
})

function setCustomValidity(event) {
  const { value } = event.target
  if (!value.length) {
    event.target.setAttribute("aria-invalid", "true")
    event.target.setCustomValidity("Это поле обязательно")
    return
  }

  event.target.setAttribute("aria-invalid", "false")
  event.target.setCustomValidity("")
}
