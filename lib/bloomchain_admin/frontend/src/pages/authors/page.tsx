import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  ReactElement,
  ChangeEvent,
  FormEvent,
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
  Toolbar,
  DialogActions,
  Button,
  IconButton,
  ButtonGroup,
  makeStyles,
  createStyles,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import AddBoxIcon from "@material-ui/icons/AddBox"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { ConditionalList } from "@ui"
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
  }),
)

export const AuthorsPage = () => {
  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [authors, setAuthors] = useState<Author[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const response = await authorsApi.get()
        setAuthors(response.data.data)
      } catch {
        setError(true)
      }

      setLoading(false)
    }
    fetchData()
  }, [])

  const [modifyingAuthor, setModifyingAuthor] = useState<Author | null>(null)
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

  const addAuthor = useCallback(
    (author: Author) => {
      setAuthors([author, ...authors])
    },
    [authors, setAuthors],
  )

  const editAuthor = useCallback(
    (modifedAuthor: Author) => {
      setAuthors(
        authors.reduce(
          (authors: Author[], author) => [
            ...authors,
            author.id !== modifedAuthor.id ? author : modifedAuthor,
          ],
          [],
        ),
      )
    },
    [authors, setAuthors],
  )

  const handleConfirmDelete = useCallback(async () => {
    if (modifyingAuthor) {
      try {
        await authorsApi.remove(modifyingAuthor.id)
        setOpenedDeleteDialog(false)
        setAuthors(authors.filter((item) => item.id !== modifyingAuthor.id))
      } catch {
        setError(true)
      }
    }
  }, [authors, modifyingAuthor, setAuthors, setOpenedDeleteDialog])

  const handleDeleteButtonClick = useCallback(
    (author: Author) => async () => {
      setOpenedDeleteDialog(true)
      setModifyingAuthor(author)
    },
    [setModifyingAuthor, setOpenedDeleteDialog],
  )

  const handleClickEditButton = useCallback(
    (author: Author) => async () => {
      setOpenedEditFormDialog(true)
      setModifyingAuthor(author)
    },
    [setModifyingAuthor, setOpenedEditFormDialog],
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
        {!error ? (
          <AuthorsTable
            data={authors}
            loading={loading}
            renderRow={(author) => (
              <AuthorsTableRow
                key={author.id}
                author={author}
                onDetete={handleDeleteButtonClick(author)}
                onEdit={handleClickEditButton(author)}
              />
            )}
          />
        ) : (
          <Alert color="error">Произошла ошибка</Alert>
        )}
      </Container>
      {openedAddFormDialog && (
        <AddAuthorFormDialog
          opened={openedAddFormDialog}
          onClose={closeAddFormDialog}
          onAddUser={addAuthor}
        />
      )}
      {openedDeleteDialog && (
        <DeleteDialog
          opened={openedDeleteDialog}
          onCancel={closeDeleteDialog}
          onConfirm={handleConfirmDelete}
        />
      )}
      {modifyingAuthor && openedEditFormDialog && (
        <EditAuthorFormDialog
          editableUser={modifyingAuthor}
          opened={openedEditFormDialog}
          onClose={closeEditFormDialog}
          onEditUser={editAuthor}
        />
      )}
    </Fragment>
  )
}

type AuthorsTableProps = {
  data: Author[]
  loading: boolean
  renderRow: (author: Author) => ReactElement<AuthorsTableRowProps>
}

const AuthorsTable = ({ data, loading, renderRow }: AuthorsTableProps) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell width="80%" component="th">
            Имя
          </TableCell>
          <TableCell width="20%" component="th">
            Действия
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!loading ? (
          <ConditionalList
            list={data}
            renderExists={(list) => (
              <Fragment>{list.map((author) => renderRow(author))}</Fragment>
            )}
          />
        ) : (
          <TableSkeleton colSpan={6} />
        )}
      </TableBody>
    </Table>
  </TableContainer>
)

type AuthorsTableRowProps = {
  author: Author
  onDetete: () => void
  onEdit: () => void
}

const AuthorsTableRow = ({
  author,
  onDetete,
  onEdit,
}: AuthorsTableRowProps) => (
  <TableRow>
    <TableCell>{author.name}</TableCell>
    <TableCell>
      <ButtonGroup>
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
      </ButtonGroup>
    </TableCell>
  </TableRow>
)

type AddAuthorFormDialogProps = {
  opened: boolean
  onClose: () => void
  onAddUser: (author: Author) => void
}

const AddAuthorFormDialog = ({
  opened,
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
      open={opened}
      onClose={onClose}
      aria-labelledby="add-author-form-dialog"
    >
      <form onSubmit={handleSubmit}>
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
  opened: boolean
  onClose: () => void
  onEditUser: (author: Author) => void
}

const EditAuthorFormDialog = ({
  editableUser,
  opened,
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
      open={opened}
      onClose={onClose}
      aria-labelledby="edit-author-form-dialog"
    >
      <form onSubmit={handleSubmit}>
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
