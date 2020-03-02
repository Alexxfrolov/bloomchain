import nanoid from "nanoid"
import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useRef,
  FormEvent,
  ReactElement,
  RefObject,
} from "react"
import format from "date-fns/format"
import {
  Grid,
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import AddBoxIcon from "@material-ui/icons/AddBox"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { ConditionalList } from "@ui"
import { archivesApi, Archive } from "@api/archives"
import { mediaApi } from "@api/media"
import {
  DeleteDialog,
  TableSkeleton,
  TableRow,
  TableCell,
} from "@features/core"

export const ArchivesPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [archives, setArchives] = useState<Archive[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const response = await archivesApi.getLatest()
        setArchives(response.data.data)
      } catch {
        setError(true)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const [currentArchive, setCurrentArchive] = useState<Archive | null>(null)
  const [openedAddFormDialog, seOpenedAddFormDialog] = useState(false)
  const [openedDeleteDialog, setOpenedDeleteDialog] = useState(false)
  const [openedEditDialog, setOpenedEditDialog] = useState(false)

  const closeDeleteDialog = useCallback(() => {
    setOpenedDeleteDialog(false)
  }, [setOpenedDeleteDialog])

  const closeEditDialog = useCallback(() => {
    setOpenedEditDialog(false)
  }, [setOpenedEditDialog])

  const handleDeleteButtonClick = useCallback(
    (archive: Archive) => () => {
      setCurrentArchive(archive)
      setOpenedDeleteDialog(true)
    },
    [setCurrentArchive, setOpenedDeleteDialog],
  )

  const handleEditButtonClick = useCallback(
    (archive: Archive) => () => {
      setCurrentArchive(archive)
      setOpenedEditDialog(true)
    },
    [setCurrentArchive, setOpenedEditDialog],
  )

  const handleConfirmDelete = useCallback(async () => {
    const response = await archivesApi.remove(currentArchive.id)
    setOpenedDeleteDialog(false)
    if (response.status === 204) {
      setArchives(archives.filter((item) => item.id !== currentArchive.id))
    }
  }, [archives, currentArchive, setArchives, setOpenedDeleteDialog])

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Grid container={true} spacing={3}>
          <Grid item={true} xs={12} container={true} spacing={3}>
            <Grid item={true}>
              <Typography component="h1" variant="h4" gutterBottom={false}>
                Архив
              </Typography>
            </Grid>
            <Grid item={true}>
              <IconButton onClick={() => seOpenedAddFormDialog(true)}>
                <AddBoxIcon color="primary" />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item={true} xs={12}>
            {!error ? (
              <ArchivesTable
                loading={loading}
                data={archives}
                renderRow={(archive) => (
                  <ArchivesTableRow
                    key={nanoid()}
                    archive={archive}
                    onDelete={handleDeleteButtonClick(archive)}
                    onEdit={handleEditButtonClick(archive)}
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
          onClose={() => seOpenedAddFormDialog(false)}
        />
      )}
      {openedDeleteDialog && (
        <DeleteDialog
          opened={openedDeleteDialog}
          onCancel={closeDeleteDialog}
          onConfirm={handleConfirmDelete}
        />
      )}
      {currentArchive && openedEditDialog && (
        <EditFormDialog
          opened={openedEditDialog}
          onClose={closeEditDialog}
          editableArchive={currentArchive}
        />
      )}
    </Fragment>
  )
}

type ArchivesTableProps = {
  loading: boolean
  data: Archive[]
  renderRow: (item: Archive) => ReactElement
}

const ArchivesTable = ({ loading, data, renderRow }: ArchivesTableProps) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell width="45%" component="th">
            Баннер
          </TableCell>
          <TableCell width="25%" component="th">
            PDF
          </TableCell>
          <TableCell width="15%" component="th">
            Опубликовано
          </TableCell>
          <TableCell width="15%" component="th">
            Действия
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!loading ? (
          <ConditionalList
            list={data}
            renderExists={(list) => (
              <Fragment>{list.map((archive) => renderRow(archive))}</Fragment>
            )}
          />
        ) : (
          <TableSkeleton colSpan={4} />
        )}
      </TableBody>
    </Table>
  </TableContainer>
)

type ArchiveTableRowProps = {
  archive: Archive
  onDelete: () => void
  onEdit: () => void
}

const ArchivesTableRow = ({
  archive,
  onDelete,
  onEdit,
}: ArchiveTableRowProps) => (
  <TableRow>
    <TableCell>
      <img
        width="100%"
        src={archive.cover.link}
        alt={archive.cover.alt}
        title={archive.cover.title}
      />
    </TableCell>
    <TableCell>
      <embed
        src={archive.pdf.link}
        type="application/pdf"
        width="160px"
        height="300px"
      />
    </TableCell>
    <TableCell nowrap="true">
      {archive.created_at &&
        format(new Date(archive.created_at), "dd.mm.yyyy hh:mm")}
    </TableCell>
    <TableCell>
      <Grid container={true} spacing={2}>
        <Grid item={true}>
          <IconButton edge="start" onClick={onEdit}>
            <EditIcon color="action" />
          </IconButton>
        </Grid>
        <Grid item={true}>
          <IconButton edge="start" onClick={onDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Grid>
      </Grid>
    </TableCell>
  </TableRow>
)

type EditFormDialogProps = {
  editableArchive: Archive
  opened: boolean
  onClose: () => void
}

const EditFormDialog = ({
  editableArchive,
  opened,
  onClose,
}: EditFormDialogProps) => {
  const imageRef: RefObject<HTMLImageElement | null> = useRef(null)
  const pdfEmbedRef: RefObject<HTMLInputElement | null> = useRef(null)

  const imageFileInputRef: RefObject<HTMLInputElement | null> = useRef(null)

  const handleImageFileInputChange = useCallback(async () => {
    if (
      imageFileInputRef.current &&
      imageFileInputRef.current.files !== null &&
      imageFileInputRef.current.files.length === 1
    ) {
      // const reader = new FileReader()

      // reader.onload = function(event: ProgressEvent<FileReader>) {
      //   if (imageRef.current) {
      //     event.target.result &&
      //       imageRef.current.setAttribute("src", event.target.result)
      //   }
      // }

      // reader.readAsDataURL(imageFileInputRef.current.files[0])

      const image = {
        image: imageFileInputRef.current.files[0],
      }

      const response = await mediaApi.create(image)
    }
  }, [])

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()
  }, [])

  return (
    <Dialog
      open={opened}
      onClose={onClose}
      aria-labelledby="add-archive-form-dialog"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="add-archive-form-dialog">
          Добавить новое в архив
        </DialogTitle>
        <DialogContent dividers={true}>
          <Grid container={true} spacing={4}>
            <Grid item={true} xs={12}>
              <a
                href={editableArchive.cover.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  ref={imageRef}
                  width="100%"
                  src={editableArchive.cover.link}
                  alt={editableArchive.cover.alt}
                />
              </a>
            </Grid>
            <Grid item={true} xs={12}>
              <input
                accept="image/*"
                id="media"
                ref={imageFileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleImageFileInputChange}
              />
              <label htmlFor="media">
                <Button variant="contained" color="primary" component="span">
                  Изменить обложку
                </Button>
              </label>
            </Grid>
            <Grid item={true} xs={12}>
              <embed
                ref={pdfEmbedRef}
                src={editableArchive.pdf.link}
                type="application/pdf"
                width="100%"
                height="300px"
              />
            </Grid>
            <Grid item={true}>
              <Button color="primary" variant="contained">
                Изменить PDF
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Отменить
          </Button>
          <Button type="submit" color="primary">
            Загрузить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

type AddFormDialogProps = {
  opened: boolean
  onClose: () => void
}

const AddFormDialog = ({ opened, onClose }: AddFormDialogProps) => {
  const imageRef: RefObject<HTMLImageElement | null> = useRef(null)
  const pdfEmbedRef: RefObject<HTMLInputElement | null> = useRef(null)

  const [archive, setArchive] = useState({
    cover: {
      id: null,
      link: null,
      type: "image",
    },
    pdf: {
      id: null,
      link: null,
      type: "pdf",
    },
  })

  const imageFileInputRef: RefObject<HTMLInputElement | null> = useRef(null)

  const handleImageFileInputChange = useCallback(async () => {
    if (
      imageFileInputRef.current &&
      imageFileInputRef.current.files !== null &&
      imageFileInputRef.current.files.length === 1
    ) {
      const reader = new FileReader()

      reader.onload = function(event: ProgressEvent<FileReader>) {
        event?.target?.result?.[
          imageRef?.current?.[setAttribute("src", event.target.result)]
        ]
      }

      reader.readAsDataURL(imageFileInputRef.current.files[0])

      // const image = {
      //   image: imageFileInputRef.current.files[0],
      // }

      // const response = await mediaApi.create(image)
      // setArchive({
      //   ...archive,
      //   cover: {
      //     ...archive.cover,
      //     id: response.data.id,
      //     link: response.data.id,
      //   },
      // })
    }
  }, [archive, setArchive])

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()
  }, [])

  return (
    <Dialog open={opened} onClose={onClose} aria-labelledby="edit-form-dialog">
      <form onSubmit={handleSubmit}>
        <DialogTitle id="edit-form-dialog">Редактирование архива</DialogTitle>
        <DialogContent dividers={true}>
          <Grid container={true} spacing={4}>
            {imageFileInputRef?.current?.files?.length === 1 && (
              <Grid item={true} xs={12}>
                <img ref={imageRef} width="100%" />
              </Grid>
            )}
            <Grid item={true} xs={12}>
              <input
                accept="image/*"
                id="media"
                ref={imageFileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleImageFileInputChange}
              />
              <label htmlFor="media">
                <Button variant="contained" color="primary" component="span">
                  Добавить обложку
                </Button>
              </label>
            </Grid>
            {archive.pdf.id && (
              <Grid item={true} xs={12}>
                <embed
                  ref={pdfEmbedRef}
                  src={archive.pdf.link}
                  type="application/pdf"
                  width="100%"
                  height="300px"
                />
              </Grid>
            )}
            <Grid item={true} xs={12}>
              <Button color="primary" variant="contained">
                Добавить PDF
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Отменить
          </Button>
          <Button type="submit" color="primary">
            Загрузить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
