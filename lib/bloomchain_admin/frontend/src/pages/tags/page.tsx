import nanoid from "nanoid"
import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
  ReactElement,
} from "react"
import format from "date-fns/format"
import {
  Grid,
  Container,
  Paper,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import DeleteIcon from "@material-ui/icons/Delete"
import AddBoxIcon from "@material-ui/icons/AddBox"
import { ConditionalList } from "@ui"
import { tagsApi, Tag } from "@api/tags"
import {
  DeleteDialog,
  TableSkeleton,
  TableRow,
  TableCell,
} from "@features/core"

export const TagsPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const response = await tagsApi.get()
        setTags(response.data.data)
      } catch {
        setError(true)
      }

      setLoading(false)
    }
    fetchData()
  }, [])

  const [modifyingTag, setModifyingTag] = useState<Tag | null>(null)
  const [openedAddDialog, setOpenedAddDialog] = useState(false)
  const [openedDeleteDialog, setOpenedDeleteDialog] = useState(false)

  const openAddFormDialog = useCallback(() => {
    setOpenedAddDialog(true)
  }, [setOpenedAddDialog])

  const closeAddFormDialog = useCallback(() => {
    setOpenedAddDialog(false)
  }, [setOpenedAddDialog])

  const closeDeleteDialog = useCallback(() => {
    setOpenedDeleteDialog(false)
  }, [setOpenedDeleteDialog])

  const addTags = useCallback(
    (tag: Tag) => {
      setTags([tag, ...tags])
    },
    [tags, setTags],
  )

  const handleDeleteButtonClick = useCallback(
    (tag: Tag) => async () => {
      setOpenedDeleteDialog(true)
      setModifyingTag(tag)
    },
    [setModifyingTag, setOpenedDeleteDialog],
  )

  const handleConfirmDelete = useCallback(async () => {
    if (modifyingTag) {
      try {
        await tagsApi.remove(modifyingTag.id)
        setOpenedDeleteDialog(false)
        setTags(tags.filter((item) => item.id !== modifyingTag.id))
      } catch {}
    }
  }, [tags, modifyingTag, setTags, setOpenedDeleteDialog])

  return (
    <Fragment>
      <Container maxWidth="md">
        <Grid container={true} spacing={3}>
          <Grid item={true}>
            <Typography component="h1" variant="h4" gutterBottom={true}>
              Тэги
            </Typography>
          </Grid>
          <Grid item={true}>
            <IconButton onClick={openAddFormDialog}>
              <AddBoxIcon color="primary" />
            </IconButton>
          </Grid>
        </Grid>
        {!error ? (
          <TagsTable
            data={tags}
            loading={loading}
            renderRow={(tag) => (
              <TagsTableRow
                key={nanoid()}
                tag={tag}
                onDeleteRow={handleDeleteButtonClick(tag)}
              />
            )}
          />
        ) : (
          <Alert color="error">Произошла ошибка</Alert>
        )}
      </Container>
      <AddFormDialog
        opened={openedAddDialog}
        onAddTag={addTags}
        onClose={closeAddFormDialog}
      />
      <DeleteDialog
        opened={openedDeleteDialog}
        onCancel={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </Fragment>
  )
}

type TagsTableProps = {
  data: Tag[]
  loading: boolean
  renderRow: (tag: Tag) => ReactElement<TagsTableRowProps>
}

const TagsTable = ({ data, loading, renderRow }: TagsTableProps) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell width="20%" component="th">
            Наименование
          </TableCell>
          <TableCell width="20%" component="th">
            Описание
          </TableCell>
          <TableCell width="20%" component="th">
            Создан
          </TableCell>
          <TableCell width="20%" component="th">
            Обновлено
          </TableCell>
          <TableCell width="20%" component="th" align="right">
            Действия
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!loading ? (
          <ConditionalList
            list={data}
            renderExists={(list) => (
              <Fragment>{list.map((tag) => renderRow(tag))}</Fragment>
            )}
          />
        ) : (
          <TableSkeleton colSpan={5} />
        )}
      </TableBody>
    </Table>
  </TableContainer>
)

type TagsTableRowProps = {
  tag: Tag
  onDeleteRow: () => void
}

const TagsTableRow = ({ tag, onDeleteRow }: TagsTableRowProps) => (
  <TableRow>
    <TableCell>{tag.name}</TableCell>
    <TableCell>{tag.slug}</TableCell>
    <TableCell>
      {tag.created_at && format(new Date(tag.created_at), "dd.mm.yyyy hh:mm")}
    </TableCell>
    <TableCell>
      {tag.updated_at && format(new Date(tag.updated_at), "dd.mm.yyyy hh:mm")}
    </TableCell>
    <TableCell>
      <Grid container={true} justify="flex-end">
        <IconButton edge="start" onClick={onDeleteRow}>
          <DeleteIcon color="error" />
        </IconButton>
      </Grid>
    </TableCell>
  </TableRow>
)

type AddFormDialogProps = {
  opened: boolean
  onClose: () => void
  onAddTag: (tag: Tag) => void
}

const AddFormDialog = ({ opened, onAddTag, onClose }: AddFormDialogProps) => {
  const [name, setName] = useState("")

  const handleChangeNameField = useCallback(
    (event: ChangeEvent<{ value: string }>) => {
      setName(event.currentTarget.value)
    },
    [setName],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      try {
        const response = await tagsApi.create(name)
        onClose()
        onAddTag(response.data)
      } catch {}
    },
    [name, onAddTag, onClose],
  )

  return (
    <Dialog
      maxWidth="md"
      open={opened}
      onClose={onClose}
      aria-labelledby="add-form-dialog"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="add-form-dialog">Создание нового тэга</DialogTitle>
        <DialogContent dividers={true}>
          <Grid container={true} spacing={4}>
            <Grid item={true} xs={12}>
              <TextField
                label="Название"
                type="text"
                fullWidth
                onChange={handleChangeNameField}
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
