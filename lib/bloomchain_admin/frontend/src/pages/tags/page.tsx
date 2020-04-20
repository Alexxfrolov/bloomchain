import React, {
  memo,
  Fragment,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ChangeEvent,
  FormEvent,
  ReactElement,
} from "react"
import format from "date-fns/format"
import {
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
  TableSortLabel,
  TablePagination,
  TextField,
  ButtonGroup,
  Button,
  Toolbar,
  IconButton,
  makeStyles,
  createStyles,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import AddBoxIcon from "@material-ui/icons/AddBox"
import { ConditionalList } from "@ui"
import { Order, Pagination } from "@api/types"
import { tagsApi, Tag } from "@api/tags"
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
  page_size: 20,
  total_pages: 1,
  total_items: 0,
}

export const TagsPage = () => {
  const classes = useStyles()

  const [isDataLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    ...PAGINATION_PRESET,
  })
  const [order, setOrder] = useState<Order>("desc")
  const [orderBy, setOrderBy] = useState<keyof Tag>("inserted_at")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const { page_size, page } = pagination
        const response = await tagsApi.get({
          page_size,
          page,
          order,
          orderBy,
        })
        setTags(response.data.data)
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

  const [modifyingTag, setModifyingTag] = useState<Tag | null>(null)
  const [isOpenedAddDialog, setOpenedAddDialog] = useState(false)
  const [isOpenedDeleteDialog, setOpenedDeleteDialog] = useState(false)

  const openAddFormDialog = useMemo(
    () => () => {
      setOpenedAddDialog(true)
    },
    [setOpenedAddDialog],
  )

  const closeAddFormDialog = useMemo(
    () => () => {
      setOpenedAddDialog(false)
    },
    [setOpenedAddDialog],
  )

  const closeDeleteDialog = useMemo(
    () => () => {
      setOpenedDeleteDialog(false)
    },
    [setOpenedDeleteDialog],
  )

  const addTags = useMemo(
    () => (tag: Tag) => {
      setTags([tag, ...tags])
    },
    [tags, setTags],
  )

  const handleDeleteButtonClick = useMemo(
    () => (tag: Tag) => async () => {
      setOpenedDeleteDialog(true)
      setModifyingTag(tag)
    },
    [setModifyingTag, setOpenedDeleteDialog],
  )

  const handleConfirmDelete = useMemo(
    () => async () => {
      if (modifyingTag) {
        try {
          await tagsApi.remove(modifyingTag.id)
          setOpenedDeleteDialog(false)
          setTags(tags.filter((item) => item.id !== modifyingTag.id))
        } catch {
          setError(true)
        }
      }
    },
    [tags, modifyingTag, setTags, setOpenedDeleteDialog, setError],
  )

  const handleTablePageChange = useMemo(
    () => (
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

  const handleTableRowsPerPage = useMemo(
    () => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPagination({
        ...pagination,
        page: 1,
        page_size: parseInt(event.target.value, 10),
      })
    },
    [pagination, setPagination],
  )

  const handleRequestSort = useMemo(
    () => (property: keyof Tag) => {
      const isAsc = orderBy === property && order === "asc"
      setOrder(isAsc ? "desc" : "asc")
      setOrderBy(property)
    },
    [order, orderBy],
  )

  return (
    <Fragment>
      <Container maxWidth="md">
        <Toolbar disableGutters={true} className={classes.toolbar}>
          <Typography component="h1" variant="h4" className={classes.title}>
            Тэги
          </Typography>
          <IconButton
            edge="end"
            onClick={openAddFormDialog}
            aria-label="add author"
          >
            <AddBoxIcon color="primary" />
          </IconButton>
        </Toolbar>
        {!hasError ? (
          <TagsTable
            data={tags}
            isDataLoading={isDataLoading}
            pagination={pagination}
            order={order}
            orderBy={orderBy}
            renderRow={(tag) => (
              <TagsTableRow
                key={`tag-${tag.id}`}
                tag={tag}
                onDeleteRow={handleDeleteButtonClick(tag)}
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
      <AddFormDialog
        isOpened={isOpenedAddDialog}
        onAddTag={addTags}
        onClose={closeAddFormDialog}
      />
      <DeleteDialog
        isOpened={isOpenedDeleteDialog}
        onCancel={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </Fragment>
  )
}

type TablePageChangeAction = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  page: number,
) => void

const head_cells: import("@features/core").HeadCell<Tag>[] = [
  {
    id: "name",
    sort_field: "name",
    label: "Наименование",
    width: "20%",
  },
  {
    id: "slug",
    sort_field: "slug",
    label: "Описание",
    width: "20%",
  },
  {
    id: "inserted_at",
    sort_field: "inserted_at",
    label: "Дата создания",
    width: "20%",
  },
  {
    id: "updated_at",
    sort_field: "updated_at",
    label: "Дата обновления",
    width: "20%",
  },
  {
    id: "actions",
    label: "Действия",
    width: "1%",
  },
]

type TagsTableProps = {
  data: Tag[]
  isDataLoading: boolean
  order: Order
  orderBy: keyof Tag
  pagination: Pagination
  renderRow: (tag: Tag) => ReactElement<TagsTableRowProps>
  onChangePage: TablePageChangeAction
  onChangeRowsPerPage: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onRequestSort: (property: keyof Tag) => void
}

const TagsTable = memo(function (props: TagsTableProps) {
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

  const createSortHandler = useMemo(
    () => (property: keyof Tag) => () => {
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
                  <Fragment>{list.map((tag) => renderRow(tag))}</Fragment>
                )}
              />
            ) : (
              <TableSkeleton
                colSpan={5}
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

type TagsTableRowProps = {
  tag: Tag
  onDeleteRow: () => void
}

const TagsTableRow = memo(function (props: TagsTableRowProps) {
  const { tag, onDeleteRow } = props

  return (
    <TableRow>
      <TableCell>{tag.name}</TableCell>
      <TableCell>{tag.slug}</TableCell>
      <TableCell>
        {tag.inserted_at &&
          format(new Date(tag.inserted_at), "dd.mm.yyyy HH:mm")}
      </TableCell>
      <TableCell>
        {tag.updated_at && format(new Date(tag.updated_at), "dd.mm.yyyy HH:mm")}
      </TableCell>
      <TableCell>
        <ButtonGroup>
          {tag.editable && (
            <IconButton>
              <EditIcon color="action" />
            </IconButton>
          )}
          {tag.deletable && (
            <IconButton>
              <DeleteIcon color="error" onClick={onDeleteRow} />
            </IconButton>
          )}
        </ButtonGroup>
      </TableCell>
    </TableRow>
  )
})

type AddFormDialogProps = {
  isOpened: boolean
  onClose: () => void
  onAddTag: (tag: Tag) => void
}

const AddFormDialog = ({ isOpened, onAddTag, onClose }: AddFormDialogProps) => {
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
      } catch {
        throw new Error("Add tag form dialog hasError")
      }
    },
    [name, onAddTag, onClose],
  )

  return (
    <Dialog
      maxWidth="md"
      open={isOpened}
      onClose={onClose}
      aria-labelledby="add-form-dialog"
    >
      <form onSubmit={handleSubmit} noValidate={true}>
        <DialogTitle id="add-form-dialog">Создание нового тэга</DialogTitle>
        <DialogContent dividers={true}>
          <TextField
            label="Название"
            type="text"
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChangeNameField}
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
