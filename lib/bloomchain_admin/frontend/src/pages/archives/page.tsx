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
  Toolbar,
  Typography,
  FormControl,
  Button,
  IconButton,
  makeStyles,
  createStyles,
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
import { MediaUploadForm, MediaFile } from "@features/media"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
      marginBottom: theme.spacing(2),
    },
  }),
)

export const ArchivesPage = () => {
  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [archives, setArchives] = useState<Archive[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const response = await archivesApi.get()
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
        <Toolbar disableGutters={true} className={classes.toolbar}>
          <Typography component="h1" variant="h4" className={classes.title}>
            Исследования (архив)
          </Typography>
          <IconButton
            edge="end"
            onClick={() => seOpenedAddFormDialog(true)}
            aria-label="add tag"
          >
            <AddBoxIcon color="primary" />
          </IconButton>
        </Toolbar>
        {!error ? (
          <ArchivesTable
            loading={loading}
            data={archives}
            renderRow={(archive) => (
              <ArchivesTableRow
                key={archive.id}
                archive={archive}
                onDelete={handleDeleteButtonClick(archive)}
              />
            )}
          />
        ) : (
          <Alert color="error">Произошла ошибка</Alert>
        )}
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
      <object
        data={archive.pdf.url}
        type="application/pdf"
        width="160px"
        height="300px"
      ></object>
    </TableCell>
    <TableCell nowrap="true">
      {archive.created_at &&
        format(new Date(archive.created_at), "dd.mm.yyyy HH:mm")}
    </TableCell>
    <TableCell>
      <IconButton edge="end" onClick={onDelete}>
        <DeleteIcon color="error" />
      </IconButton>
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
    cover: null,
    pdf: {
      file: null,
      id: null,
      url: "",
      type: "pdf",
    },
  })

  const pdfFileInputRef: RefObject<HTMLInputElement> = useRef(null)
  const pdfRef: RefObject<HTMLEmbedElement> = useRef(null)

  const handlePDFFileInputChange = useCallback(() => {
    if (pdfFileInputRef.current && pdfFileInputRef.current.files !== null) {
      const blobURL = URL.createObjectURL(pdfFileInputRef.current.files[0])
      pdfRef.current?.setAttribute("data", blobURL)
      pdfRef.current?.removeAttribute("hidden")
      pdfRef.current?.setAttribute("style", "height: 300px;")
      setArchive({
        ...archive,
        pdf: {
          ...archive.pdf,
          file: pdfFileInputRef.current.files[0],
        },
      })
    }
  }, [archive, setArchive])

  // const handleChangeTextField = useCallback(
  //   (event: ChangeEvent<{ value: string }>) => {
  //     setArchive({
  //       ...archive,
  //       cover: {
  //         ...archive.cover,
  //         alt: event.currentTarget.value,
  //       },
  //     })
  //   },
  //   [archive, setArchive],
  // )

  const handleUpload = useCallback(
    (image: MediaFile) => {
      setArchive({
        ...archive,
        cover: image,
      })
    },
    [archive, setArchive],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      try {
        const pdf = await mediaApi.create(archive.pdf)
        const response = await archivesApi.create(archive.cover.id, pdf.data.id)
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
          Добавить новый архив
        </DialogTitle>
        <DialogContent dividers={true}>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <Typography variant="h6" component="h6" gutterBottom={false}>
              Обложка
            </Typography>
          </FormControl>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <MediaUploadForm onUpload={handleUpload} />
          </FormControl>
          {archive.cover && (
            <FormControl margin="normal" fullWidth={true} variant="outlined">
              <img src={archive.cover.url} width="100%" />
            </FormControl>
          )}
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <Typography variant="h6" component="h6">
              PDF
            </Typography>
          </FormControl>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <object
              ref={pdfRef}
              type="application/pdf"
              width="100%"
              hidden
            ></object>
          </FormControl>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
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
          </FormControl>
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
