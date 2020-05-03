import React, {
  Fragment,
  memo,
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
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  TableSortLabel,
  TablePagination,
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
import { Order, Pagination } from "@api/common/types"
import { archivesApi, Archive } from "@api/archives"
import { mediaApi, MediaFile } from "@api/media"
import {
  ErrorDialog,
  DeleteDialog,
  TableSkeleton,
  TableRow,
  TableCell,
} from "@features/core"
import { MediaUploadForm } from "@features/media"

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
  page_size: 20,
  total_pages: 1,
  total_items: 0,
}

export const ArchivesPage = () => {
  const classes = useStyles()

  const [isDataLoading, setDataLoading] = useState(false)
  const [hasError, setError] = useState(false)
  const [archives, setArchives] = useState<Archive[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    ...PAGINATION_PRESET,
  })
  const [order, setOrder] = useState<Order>("desc")
  const [orderBy, setOrderBy] = useState<keyof Archive>("inserted_at")

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true)
      setError(false)

      try {
        const { page_size, page } = pagination
        const response = await archivesApi.get({
          page_size,
          page,
          order,
          orderBy,
        })
        setArchives(response.data.data)
        setPagination({
          ...pagination,
          ...response.data.meta,
        })
      } catch {
        setError(true)
      }
      setDataLoading(false)
    }
    fetchData()
  }, [pagination.page_size, pagination.page, order, orderBy])

  const [modifyingArchive, setModifyingArchive] = useState<Archive | null>(null)
  const [isOpenedAddFormDialog, seOpenedAddFormDialog] = useState(false)
  const [isOpenedDeleteDialog, setOpenedDeleteDialog] = useState(false)
  const [isOpenedErrorDialog, setOpenedErrorDialog] = useState(false)

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
    (property: keyof Archive) => {
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
        {!hasError ? (
          <ArchivesTable
            isDataLoading={isDataLoading}
            data={archives}
            pagination={pagination}
            order={order}
            orderBy={orderBy}
            renderRow={(archive) => (
              <ArchivesTableRow
                key={archive.id}
                archive={archive}
                onDelete={handleDeleteButtonClick(archive)}
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
        <AddFormDialog
          isOpened={isOpenedAddFormDialog}
          onClose={() => seOpenedAddFormDialog(false)}
          onAdd={addArchive}
        />
      )}
      {isOpenedDeleteDialog && (
        <DeleteDialog
          isOpened={isOpenedDeleteDialog}
          onCancel={closeDeleteDialog}
          onConfirm={handleConfirmDelete}
        />
      )}
      <ErrorDialog
        isOpened={isOpenedErrorDialog}
        onClose={() => setOpenedErrorDialog(true)}
      />
    </Fragment>
  )
}

type TablePageChangeAction = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  page: number,
) => void

const head_cells: import("@features/core").HeadCell<Archive>[] = [
  {
    id: "banner",
    label: "Баннер",
    width: "45%",
  },
  {
    id: "pdf",
    label: "PDF",
    width: "25%",
  },
  {
    id: "inserted_at",
    sort_field: "inserted_at",
    label: "Дата публикации",
    width: "15%",
  },
  {
    id: "actions",
    label: "Действия",
    width: "15%",
  },
]

type ArchivesTableProps = {
  isDataLoading: boolean
  data: Archive[]
  order: Order
  orderBy: keyof Archive
  pagination: Pagination
  renderRow: (item: Archive) => ReactElement
  onChangePage: TablePageChangeAction
  onChangeRowsPerPage: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onRequestSort: (property: keyof Archive) => void
}

const ArchivesTable = memo(function (props: ArchivesTableProps) {
  const classes = useStyles()
  const {
    order,
    orderBy,
    pagination,
    data,
    isDataLoading,
    renderRow,
    onChangePage,
    onChangeRowsPerPage,
    onRequestSort,
  } = props

  const createSortHandler = useCallback(
    (property: keyof Archive) => () => {
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
                    orderBy === head_cell.sort_field ? order : false
                  }
                  style={{ width: head_cell.width }}
                >
                  <TableSortLabel
                    active={orderBy === head_cell.sort_field}
                    direction={orderBy === head_cell.sort_field ? order : "asc"}
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
                        {order === "desc"
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
                  <Fragment>
                    {list.map((archive) => renderRow(archive))}
                  </Fragment>
                )}
              />
            ) : (
              <TableSkeleton colSpan={4} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ConditionalList
        list={data}
        renderExists={() => (
          <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
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

type ArchiveTableRowProps = {
  archive: Archive
  onDelete: () => void
}

const ArchivesTableRow = memo(function (props: ArchiveTableRowProps) {
  const { archive, onDelete } = props
  return (
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
          aria-label="pdf preview"
        ></object>
      </TableCell>
      <TableCell nowrap="true">
        {format(new Date(archive.inserted_at), "dd.mm.yyyy HH:mm")}
      </TableCell>
      <TableCell>
        <IconButton edge="end" onClick={onDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
})

type AddFormDialogProps = {
  isOpened: boolean
  onAdd: (archive: Archive) => void
  onClose: () => void
}

const AddFormDialog = memo(function ({
  isOpened,
  onAdd,
  onClose,
}: AddFormDialogProps) {
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
      open={isOpened}
      onClose={onClose}
      aria-labelledby="add-archive-form-dialog"
    >
      <form onSubmit={handleSubmit} noValidate={true}>
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
              <img
                src={archive.cover.url}
                width="100%"
                alt={archive.cover?.alt ?? ""}
              />
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
              aria-label="pdf preview"
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
})
