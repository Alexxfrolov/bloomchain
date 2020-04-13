import React, {
  Fragment,
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
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  ButtonGroup,
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
  }),
)

export const UsersPage = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const response = await usersApi.get()
        setUsers(response.data.data)
      } catch {
        setError(true)
      }

      setLoading(false)
    }
    fetchData()
  }, [])

  const [modifyingUser, setModifyingUser] = useState<User | null>(null)
  const [openedAddFormDialog, setOpenedAddFormDialog] = useState(false)
  const [openedEditFormDialog, setOpenedEditFormDialog] = useState(false)
  const [openedDeleteDialog, setOpenedDeleteDialog] = useState(false)

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
        users.reduce(
          (users: User[], user) => [
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
        {!error ? (
          <UsersTable
            data={users}
            loading={loading}
            renderRow={(user) => (
              <UsersTableRow
                key={user.id}
                user={user}
                onDetete={handleDeleteButtonClick(user)}
                onEdit={handleClickEditButton(user)}
              />
            )}
          />
        ) : (
          <Alert color="error">Произошла ошибка</Alert>
        )}
      </Container>
      {openedAddFormDialog && (
        <AddUserFormDialog
          opened={openedAddFormDialog}
          onClose={closeAddFormDialog}
          onAddUser={addUser}
        />
      )}
      {openedDeleteDialog && (
        <DeleteDialog
          opened={openedDeleteDialog}
          onCancel={closeDeleteDialog}
          onConfirm={handleConfirmDelete}
        />
      )}
      {modifyingUser && openedEditFormDialog && (
        <EditUserFormDialog
          editableUser={modifyingUser}
          opened={openedEditFormDialog}
          onClose={closeEditFormDialog}
          onEditUser={editUser}
        />
      )}
    </Fragment>
  )
}

type UsersTableProps = {
  data: User[]
  loading: boolean
  renderRow: (user: User) => ReactElement<UsersTableRowProps>
}

const UsersTable = ({ data, loading, renderRow }: UsersTableProps) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell width="1%" component="th">
            Имя
          </TableCell>
          <TableCell width="1%" component="th">
            Фамилия
          </TableCell>
          <TableCell width="1%" component="th">
            Роль
          </TableCell>
          <TableCell width="1%" component="th">
            Должность
          </TableCell>
          <TableCell width="1%" component="th">
            Телефон
          </TableCell>
          <TableCell width="1%" component="th">
            E-mail
          </TableCell>
          <TableCell width="1%" component="th">
            Действия
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!loading ? (
          <ConditionalList
            list={data}
            renderExists={(list) => (
              <Fragment>{list.map((user) => renderRow(user))}</Fragment>
            )}
          />
        ) : (
          <TableSkeleton colSpan={6} />
        )}
      </TableBody>
    </Table>
  </TableContainer>
)

type UsersTableRowProps = {
  user: User
  onDetete: () => void
  onEdit: () => void
}

const UsersTableRow = ({ user, onDetete, onEdit }: UsersTableRowProps) => (
  <TableRow>
    <TableCell>{user.first_name}</TableCell>
    <TableCell>{user.last_name}</TableCell>
    <TableCell>{user.role}</TableCell>
    <TableCell>{user.job}</TableCell>
    <TableCell>{user.phone}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>
      <ButtonGroup>
        <IconButton onClick={onEdit}>
          <EditIcon color="action" />
        </IconButton>
        <IconButton onClick={onDetete}>
          <DeleteIcon color="error" />
        </IconButton>
      </ButtonGroup>
    </TableCell>
  </TableRow>
)

type AddUserFormDialogProps = {
  opened: boolean
  onClose: () => void
  onAddUser: (user: User) => void
}

const AddUserFormDialog = ({
  opened,
  onAddUser,
  onClose,
}: AddUserFormDialogProps) => {
  const [user, setUser] = useState<
    Omit<User, "created_at" | "updated_at" | "id">
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
      open={opened}
      onClose={onClose}
      aria-labelledby="add-user-form-dialog"
    >
      <form onSubmit={handleSubmit}>
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
}

type EditUserFormDialogProps = {
  editableUser: User
  opened: boolean
  onClose: () => void
  onEditUser: (user: User) => void
}

const EditUserFormDialog = ({
  editableUser,
  opened,
  onEditUser,
  onClose,
}: EditUserFormDialogProps) => {
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
      open={opened}
      onClose={onClose}
      aria-labelledby="add-user-form-dialog"
    >
      <form onSubmit={handleSubmit}>
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
}

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
