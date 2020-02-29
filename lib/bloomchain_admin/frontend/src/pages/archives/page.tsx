import nanoid from "nanoid"
import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  FormEvent,
  ReactElement,
} from "react"
import format from "date-fns/format"
import {
  withStyles,
  createStyles,
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
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  IconButton,
  Theme,
} from "@material-ui/core"
import { Alert, Skeleton } from "@material-ui/lab"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { ConditionalList } from "@ui"
import { archivesAPI, Archive } from "@api/archives"
import { DeleteDialog } from "@features/core"

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default,
      },
    },
  }),
)(TableRow)

export const ArchivesPage = () => {
  const [currentArchive, setCurrentArchive] = useState<Archive | null>(null)
  const [openedDeleteDialog, setOpenedDeleteDialog] = useState(false)
  const [openedEditDialog, setOpenedEditDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [archives, setArchives] = useState<Archive[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const response = await archivesAPI.getLatest()
        setArchives(response.data.data)
      } catch {
        setError(true)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const closeDeleteDialog = useCallback(() => {
    setOpenedDeleteDialog(false)
  }, [setOpenedDeleteDialog])

  const closeEditDialog = useCallback(() => {
    setOpenedEditDialog(false)
  }, [setOpenedEditDialog])

  const handleDeleteButtonClick = useCallback(
    (archive: Archive) => async () => {
      setCurrentArchive(archive)
      setOpenedDeleteDialog(true)
    },
    [setCurrentArchive, setOpenedDeleteDialog],
  )

  const handleConfirmDelete = useCallback(async () => {
    const response = await archivesAPI.remove(currentArchive.id)
    setOpenedDeleteDialog(false)
    if (response.status === 204) {
      setArchives(archives.filter((item) => item.id !== currentArchive.id))
    }
  }, [archives, currentArchive, setArchives, setOpenedDeleteDialog])

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault()
  }, [])

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Grid container={true} spacing={3}>
          <Grid item={true} xs={12}>
            <Typography component="h1" variant="h4" gutterBottom={false}>
              Исследования
            </Typography>
          </Grid>
          <Grid item={true} xs={12}>
            {!error ? (
              <ArchivesTable
                loading={loading}
                data={archives}
                renderRow={(archive) => (
                  <ArchiveTableRow
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
      <DeleteDialog
        opened={openedDeleteDialog}
        onCancel={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
      {currentArchive && (
        <EditFormDialog
          opened={openedEditDialog}
          onClose={closeEditDialog}
          archive={currentArchive}
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
          <StyledTableCell width="45%" component="th">
            Баннер
          </StyledTableCell>
          <StyledTableCell width="25%" component="th">
            PDF
          </StyledTableCell>
          <StyledTableCell width="15%" component="th">
            Дата публикации
          </StyledTableCell>
          <StyledTableCell width="15%" component="th">
            Действия
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!loading ? (
          <ConditionalList
            list={data}
            renderExists={(list) => list.map((archive) => renderRow(archive))}
          />
        ) : (
          <Fragment>
            {Array.from({ length: 20 }).map(() => (
              <StyledTableRow key={nanoid()}>
                <StyledTableCell colSpan={2} padding="none">
                  <Skeleton variant="rect" width="100%" height="53px" />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </Fragment>
        )}
      </TableBody>
    </Table>
  </TableContainer>
)

type ArchiveTableRowProps = {
  archive: Archive
  onDelete: () => void
}

const ArchiveTableRow = ({ archive, onDelete }: ArchiveTableRowProps) => (
  <StyledTableRow>
    <StyledTableCell>
      <img
        width="100%"
        src={archive.cover.link}
        alt={archive.cover.alt}
        title={archive.cover.title}
      />
    </StyledTableCell>
    <StyledTableCell>
      <embed
        src={archive.pdf.link}
        type="application/pdf"
        width="160px"
        height="300px"
      />
    </StyledTableCell>
    <StyledTableCell nowrap={true}>
      {format(new Date(archive.created_at), "dd.mm.yyyy hh:mm")}
    </StyledTableCell>
    <StyledTableCell>
      <Grid container={true} spacing={2}>
        <Grid item={true}>
          <IconButton edge="start" color="inherit">
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid item={true}>
          <IconButton edge="start" color="inherit" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </StyledTableCell>
  </StyledTableRow>
)

type EditFormDialogProps = {
  archive: Archive
  opened: boolean
  onClose: () => void
}

const EditFormDialog = ({ archive, opened, onClose }: EditFormDialogProps) => {
  // const imageRef: RefObject<HTMLImageElement | null> = useRef(null)
  // const fileInputRef: RefObject<HTMLInputElement | null> = useRef(null)
  // const [file, setFile] = useState<File | null>(null)
  // const [title, setTitle] = useState("")
  // const [alt, setAlt] = useState("")
  // const [source, setSource] = useState("")

  // const handleFileInputChange = useCallback(() => {
  //   if (
  //     fileInputRef.current &&
  //     fileInputRef.current.files !== null &&
  //     fileInputRef.current.files.length === 1
  //   ) {
  //     const reader = new FileReader()

  //     reader.onload = function(event: ProgressEvent<FileReader>) {
  //       if (imageRef.current) {
  //         event.target.result &&
  //           imageRef.current.setAttribute("src", event.target.result)
  //       }
  //     }

  //     reader.readAsDataURL(fileInputRef.current.files[0])

  //     setFile(fileInputRef.current.files[0])
  //   }
  // }, [fileInputRef, imageRef, setFile])

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()
    // if (file) {
    //   const image = {
    //     image: file,
    //     title,
    //     alt,
    //     source,
    //   }
    //   const response = await mediaAPI.create(image)
    //   if (response.status === 201) {
    //     onClose()
    //     onAddMedia(response.data)
    //   }
    // }
  }, [])

  return (
    <Dialog open={opened} onClose={onClose} aria-labelledby="edit-form-dialog">
      <form onSubmit={handleSubmit}>
        <DialogTitle id="edit-form-dialog">Редактирование архива</DialogTitle>
        <DialogContent dividers={true}>
          <Grid container={true} spacing={4}>
            {/* <Grid item={true} xs={12} container={true} spacing={2}>
              {file && (
                <Grid item={true} xs={12}>
                  <img width="100%" ref={imageRef} />
                </Grid>
              )}
              <Grid item={true} xs={12}>
                <input
                  accept="image/*"
                  id="media"
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
                <label htmlFor="media">
                  <Button variant="contained" color="primary" component="span">
                    Загрузить
                  </Button>
                </label>
              </Grid>
            </Grid> */}
            {/* <Grid item={true} xs={12}>
              <TextField
                id="alt"
                label="Alt"
                required={true}
                type="text"
                fullWidth
                onChange={handleChangeAltField}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                id="title"
                label="Title"
                type="text"
                fullWidth
                onChange={handleChangeTitleField}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                id="source"
                label="Source"
                type="text"
                fullWidth
                onChange={handleChangeSourceField}
              />
            </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained" color="primary">
            Отменить
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Загрузить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
