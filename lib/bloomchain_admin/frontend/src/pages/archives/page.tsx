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
  ChangeEvent,
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
  TextField,
  Button,
  IconButton,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import AddBoxIcon from "@material-ui/icons/AddBox"
import DeleteIcon from "@material-ui/icons/Delete"
import { ConditionalList } from "@ui"
import { archivesApi, Archive } from "@api/archives"
import { mediaApi } from "@api/media"
import {
  ErrorDialog,
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

  const [modifyingArchive, setModifyingArchive] = useState<Archive | null>(null)
  const [openedAddFormDialog, seOpenedAddFormDialog] = useState(false)
  const [openedDeleteDialog, setOpenedDeleteDialog] = useState(false)
  const [openedErrorDialog, setOpenedErrorDialog] = useState(false)

  const closeDeleteDialog = useCallback(() => {
    setOpenedDeleteDialog(false)
  }, [setOpenedDeleteDialog])

  const addArchive = useCallback(
    (modifedArchive: Archive) => {
      setArchives([modifedArchive, ...archives])
    },
    [archives, setArchives],
  )

  const handleDeleteButtonClick = useCallback(
    (archive: Archive) => () => {
      setModifyingArchive(archive)
      setOpenedDeleteDialog(true)
    },
    [setModifyingArchive, setOpenedDeleteDialog],
  )

  const handleConfirmDelete = useCallback(async () => {
    try {
      await archivesApi.remove(modifyingArchive.id)
      setOpenedDeleteDialog(false)
      setArchives(archives.filter((item) => item.id !== modifyingArchive.id))
    } catch {
      setOpenedErrorDialog(true)
    }
  }, [archives, modifyingArchive, setArchives, setOpenedDeleteDialog])

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
          onAdd={addArchive}
        />
      )}
      {openedDeleteDialog && (
        <DeleteDialog
          opened={openedDeleteDialog}
          onCancel={closeDeleteDialog}
          onConfirm={handleConfirmDelete}
        />
      )}
      <ErrorDialog
        opened={openedErrorDialog}
        onClose={() => setOpenedErrorDialog(true)}
      />
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
            Дата публикации
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
}

const ArchivesTableRow = ({ archive, onDelete }: ArchiveTableRowProps) => (
  <TableRow>
    <TableCell>
      <img
        width="100%"
        src={archive.cover.url}
        alt={archive.cover.alt ?? ""}
        title={archive.cover.title ?? ""}
      />
    </TableCell>
    <TableCell>
      <embed
        src={archive.pdf.url}
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
      <Grid container={true} justify="center">
        <IconButton edge="start" onClick={onDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </Grid>
    </TableCell>
  </TableRow>
)

type AddFormDialogProps = {
  opened: boolean
  onAdd: (archive: Archive) => void
  onClose: () => void
}

const AddFormDialog = ({ opened, onAdd, onClose }: AddFormDialogProps) => {
  const [archive, setArchive] = useState({
    cover: {
      file: null,
      id: null,
      url: "",
      alt: "",
      type: "image",
    },
    pdf: {
      file: null,
      id: null,
      url: "",
      type: "pdf",
    },
  })

  const imageFileInputRef: RefObject<HTMLInputElement | null> = useRef(null)
  const pdfFileInputRef: RefObject<HTMLInputElement | null> = useRef(null)
  const imageRef: RefObject<HTMLImageElement | null> = useRef(null)
  const pdfRef: RefObject<HTMLEmbedElement | null> = useRef(null)

  const handleImageFileInputChange = useCallback(async () => {
    if (
      imageFileInputRef.current &&
      imageFileInputRef.current.files !== null &&
      imageFileInputRef.current.files.length === 1
    ) {
      const reader = new FileReader()

      reader.onload = function(event: ProgressEvent<FileReader>) {
        if (imageRef.current) {
          event?.target?.result?.[
            imageRef.current.setAttribute("src", event.target.result)
          ]
        }
      }

      reader.readAsDataURL(imageFileInputRef.current.files[0])

      setArchive({
        ...archive,
        cover: {
          ...archive.cover,
          file: imageFileInputRef.current.files[0],
        },
      })
    }
  }, [archive, setArchive])

  const handlePDFFileInputChange = useCallback(async () => {
    if (
      pdfFileInputRef.current &&
      pdfFileInputRef.current.files !== null &&
      pdfFileInputRef.current.files.length === 1
    ) {
      const reader = new FileReader()

      reader.onload = function(event: ProgressEvent<FileReader>) {
        if (pdfRef.current) {
          event?.target?.result?.[
            pdfRef.current.setAttribute("src", event.target.result)
          ]
        }
      }

      reader.readAsDataURL(pdfFileInputRef.current.files[0])

      setArchive({
        ...archive,
        pdf: {
          ...archive.pdf,
          file: pdfFileInputRef.current.files[0],
        },
      })
    }
  }, [archive, setArchive])

  const handleChangeTextField = useCallback(
    (event: ChangeEvent<{ value: string }>) => {
      setArchive({
        ...archive,
        cover: {
          ...archive.cover,
          alt: event.currentTarget.value,
        },
      })
    },
    [archive, setArchive],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      try {
        const [image, pdf] = await Promise.all([
          mediaApi.create(archive.cover),
          mediaApi.create(archive.pdf),
        ])
        const response = await archivesApi.create(image.data.id, pdf.data.id)
        onAdd(response.data)
        onClose()
      } catch {}
    },
    [archive, onClose, onAdd],
  )

  return (
    <Dialog
      open={opened}
      onClose={onClose}
      aria-labelledby="add-archive-form-dialog"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="add-archive-form-dialog">
          Добавить новый архива
        </DialogTitle>
        <DialogContent dividers={true}>
          <Grid container={true} spacing={4}>
            {archive.cover.file !== null && (
              <Fragment>
                <Grid item={true} xs={12}>
                  <img ref={imageRef} width="100%" />
                </Grid>
                <Grid item={true} xs={12}>
                  <TextField
                    id="alt"
                    label="Alt"
                    value={archive.cover.alt}
                    type="text"
                    fullWidth={true}
                    onChange={handleChangeTextField}
                  />
                </Grid>
              </Fragment>
            )}
            <Grid item={true} xs={12}>
              <input
                accept="image/*"
                id="cover"
                ref={imageFileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleImageFileInputChange}
              />
              <label htmlFor="cover">
                <Button variant="contained" color="primary" component="span">
                  Добавить обложку
                </Button>
              </label>
            </Grid>
            {archive.pdf.file !== null && (
              <Grid item={true} xs={12}>
                <embed
                  ref={pdfRef}
                  type="application/pdf"
                  width="100%"
                  height="300px"
                />
              </Grid>
            )}
            <Grid item={true} xs={12}>
              <input
                accept="application/pdf"
                id="pdf"
                ref={pdfFileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handlePDFFileInputChange}
              />
              <label htmlFor="pdf">
                <Button variant="contained" color="primary" component="span">
                  Добавить PDF
                </Button>
              </label>
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
