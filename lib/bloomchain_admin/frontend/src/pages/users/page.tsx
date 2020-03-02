import nanoid from "nanoid"
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
  Grid,
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
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

export const UsersPage = () => {
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

  const [currentUser, setCurrentUser] = useState<User | null>(null)
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
    (editedUser: User) => {
      setUsers(
        users.reduce(
          (users: User[], user) => [
            ...users,
            user.id !== editedUser.id ? user : editedUser,
          ],
          [],
        ),
      )
    },
    [users, setUsers],
  )

  const handleConfirmDelete = useCallback(async () => {
    if (currentUser) {
      const response = await usersApi.remove(currentUser.id)
      setOpenedDeleteDialog(false)
      if (response.status === 204) {
        setUsers(users.filter((item) => item.id !== currentUser.id))
      }
    }
  }, [users, currentUser, setUsers, setOpenedDeleteDialog])

  const handleDeleteButtonClick = useCallback(
    (user: User) => async () => {
      setOpenedDeleteDialog(true)
      setCurrentUser(user)
    },
    [setCurrentUser, setOpenedDeleteDialog],
  )

  const handleClickEditButton = useCallback(
    (user: User) => async () => {
      setOpenedEditFormDialog(true)
      setCurrentUser(user)
    },
    [setCurrentUser, setOpenedEditFormDialog],
  )

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Grid container={true} spacing={3}>
          <Grid item={true}>
            <Typography component="h1" variant="h4" gutterBottom={false}>
              Пользователи
            </Typography>
          </Grid>
          <Grid item={true}>
            <IconButton onClick={openAddFormDialog}>
              <AddBoxIcon color="primary" />
            </IconButton>
          </Grid>
          <Grid item={true} xs={12}>
            {!error ? (
              <UserTable
                data={users}
                loading={loading}
                renderRow={(user) => (
                  <UserTableRow
                    key={nanoid()}
                    user={user}
                    onDetete={handleDeleteButtonClick(user)}
                    onEdit={handleClickEditButton(user)}
                  />
                )}
              />
            ) : (
              <Alert color="error">Произошла ошибка</Alert>
            )}
          </Grid>
        </Grid>
      </Container>
      {openedAddFormDialog && (
        <AddFormDialog
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
      {currentUser && openedEditFormDialog && (
        <EditFormDialog
          editableUser={currentUser}
          opened={openedEditFormDialog}
          onClose={closeEditFormDialog}
          onEditUser={editUser}
        />
      )}
    </Fragment>
  )
}

type UserTableProps = {
  data: User[]
  loading: boolean
  renderRow: (user: User) => ReactElement<UserTableRowProps>
}

const UserTable = ({ data, loading, renderRow }: UserTableProps) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell width="1%" component="th">
            Фамилияы
          </TableCell>
          <TableCell width="1%" component="th">
            Имя
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

type UserTableRowProps = {
  user: User
  onDetete: () => void
  onEdit: () => void
}

const UserTableRow = ({ user, onDetete, onEdit }: UserTableRowProps) => (
  <TableRow key={nanoid()}>
    <TableCell>{user.last_name}</TableCell>
    <TableCell>{user.first_name}</TableCell>
    <TableCell>{user.role}</TableCell>
    <TableCell>{user.job}</TableCell>
    <TableCell>{user.phone}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>
      <Grid container={true} spacing={2}>
        <Grid item={true}>
          <IconButton edge="start" onClick={onEdit}>
            <EditIcon color="action" />
          </IconButton>
        </Grid>
        <Grid item={true}>
          <IconButton edge="start" onClick={onDetete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Grid>
      </Grid>
    </TableCell>
  </TableRow>
)

type AddFormDialogProps = {
  opened: boolean
  onClose: () => void
  onAddUser: (user: User) => void
}

const AddFormDialog = ({ opened, onAddUser, onClose }: AddFormDialogProps) => {
  const [user, setUser] = useState<
    Pick<User, "name" | "role" | "job" | "phone" | "email">
  >({
    name: "",
    role: "writer",
    job: "",
    phone: "",
    email: "",
  })

  const labelRef: RefObject<HTMLLabelElement> | null = useRef(null)
  const [labelWidth, setSelectRoleLabelWidth] = useState(0)

  useEffect(() => {
    if (labelRef.current) {
      setSelectRoleLabelWidth(labelRef.current.offsetWidth)
    }
  }, [])

  const handleChangeTextField = useCallback(
    (field: keyof User) => (event: ChangeEvent<{ value: string }>) => {
      setUser({ ...user, [field]: event.currentTarget.value })
    },
    [user, setUser],
  )

  const handleChangeSelect = useCallback(
    (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
      setUser({ ...user, role: event.target.value })
    },
    [user, setUser],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      const response = await usersApi.create(user)
      if (response.status === 201) {
        onClose()
        onAddUser(response.data)
      }
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
          <Grid container={true} spacing={4}>
            <Grid item={true} xs={12}>
              <TextField
                label="Имя"
                type="text"
                value={user.name}
                fullWidth
                onChange={handleChangeTextField("name")}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <FormControl fullWidth={true}>
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
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                label="Должность"
                type="text"
                value={user.job}
                fullWidth
                onChange={handleChangeTextField("job")}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                label="Телефон"
                type="tel"
                value={user.phone}
                fullWidth
                onChange={handleChangeTextField("phone")}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                label="Email"
                type="email"
                value={user.email}
                fullWidth
                onChange={handleChangeTextField("email")}
              />
            </Grid>
          </Grid>
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

type EditFormDialogProps = {
  editableUser: User
  opened: boolean
  onClose: () => void
  onEditUser: (user: User) => void
}

const EditFormDialog = ({
  editableUser,
  opened,
  onEditUser,
  onClose,
}: EditFormDialogProps) => {
  const [user, setUser] = useState<User>({ ...editableUser })

  const labelRef: RefObject<HTMLLabelElement> | null = useRef(null)
  const [labelWidth, setSelectRoleLabelWidth] = useState(0)

  useEffect(() => {
    if (labelRef.current) {
      setSelectRoleLabelWidth(labelRef.current.offsetWidth)
    }
  }, [])

  const handleChangeTextField = useCallback(
    (field: keyof User) => (event: ChangeEvent<{ value: string }>) => {
      setUser({ ...user, [field]: event.currentTarget.value })
    },
    [user, setUser],
  )

  const handleChangeSelect = useCallback(
    (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
      setUser({ ...user, role: event.target.value })
    },
    [user, setUser],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      const response = await usersApi.update(user)
      if (response.status === 200) {
        onClose()
        onEditUser(response.data)
      }
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
          <Grid container={true} spacing={4}>
            <Grid item={true} xs={12}>
              <TextField
                label="Имя"
                type="text"
                value={user.name}
                fullWidth
                onChange={handleChangeTextField("name")}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <FormControl fullWidth={true}>
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
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                label="Должность"
                type="text"
                value={user.job}
                fullWidth
                onChange={handleChangeTextField("job")}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                label="Телефон"
                type="tel"
                value={user.phone}
                fullWidth
                onChange={handleChangeTextField("phone")}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                label="Email"
                type="email"
                value={user.email}
                fullWidth
                onChange={handleChangeTextField("email")}
              />
            </Grid>
          </Grid>
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
