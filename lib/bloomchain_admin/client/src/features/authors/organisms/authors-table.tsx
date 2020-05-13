import React, { memo, useCallback } from "react"
import { useFormik, FormikErrors } from "formik"
import format from "date-fns/format"
import {
  Grid,
  Typography,
  TableRow,
  TableCell,
  TextField,
  IconButton,
} from "@material-ui/core"
import { Column } from "material-table"
import IconCheck from "@material-ui/icons/Check"
import IconClear from "@material-ui/icons/Clear"
import { Pagination, OrderDirection } from "@api/common"
import { Author } from "@api/authors"
import { Table, TableRowActionMode } from "@features/core"

type AuthorsTableProps = {
  isLoading: boolean
  data: Author[]
  pagination: Pagination
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (pageSize: number) => void
  onOrderChange: (orderBy: keyof Author, orderDirection: OrderDirection) => void
  onRowAdd: (authorName: string) => Promise<void>
  onRowDelete: (author: Author) => Promise<void>
  onRowUpdate: (author: Author) => Promise<void>
}

export const AuthorsTable = memo(function AuthorsTable(
  props: AuthorsTableProps,
) {
  const {
    data,
    isLoading,
    pagination,
    onChangePage,
    onChangeRowsPerPage,
    onOrderChange,
    onRowAdd,
    onRowDelete,
    onRowUpdate,
  } = props

  const handleOrderChange = useCallback(
    (orderBy: number, orderDirection: OrderDirection) => {
      const { field } = columns[orderBy]
      onOrderChange(field as keyof Author, orderDirection)
    },
    [onOrderChange],
  )

  const handleRowAdd = useCallback((author: Author) => onRowAdd(author.name), [
    onRowAdd,
  ])

  const handleRowUpdate = useCallback(
    (newData: Author, oldData?: Author) =>
      onRowUpdate({ ...oldData, ...newData }),
    [onRowUpdate],
  )

  const handleRowDelete = useCallback((author: Author) => onRowDelete(author), [
    onRowDelete,
  ])

  return (
    <Table
      title="Авторы"
      data={data}
      columns={columns}
      isLoading={isLoading}
      page={pagination.page - 1}
      totalCount={pagination.total_items}
      components={{
        EditRow: AuthorsTableEditRow,
      }}
      options={{
        pageSize: pagination.page_size,
        pageSizeOptions: pagination.page_size_options,
      }}
      editable={{
        isEditable: (author) => author.editable,
        isDeletable: (author) => author.deletable,
        onRowAdd: handleRowAdd,
        onRowUpdate: handleRowUpdate,
        onRowDelete: handleRowDelete,
      }}
      onOrderChange={handleOrderChange}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  )
})

const columns: Column<Author>[] = [
  {
    title: "Имя",
    field: "name",
  },
  {
    title: "Дата создания",
    field: "inserted_at",
    defaultSort: "desc",
    render: (rowData) =>
      format(new Date(rowData.inserted_at), "dd.MM.yyyy HH:mm"),
  },
]

type AuthorsTableEditRowProps = {
  data?: Author
  mode: TableRowActionMode
  localization: {
    saveTooltip: string
    cancelTooltip: string
    deleteText: string
  }
  onEditingCanceled: (
    mode: TableRowActionMode,
    rowData?: Author,
  ) => Promise<void>
  onEditingApproved: (
    mode: TableRowActionMode,
    newData: Partial<Author>,
    oldData?: Author,
  ) => Promise<void>
}

const AuthorsTableEditRow = (props: AuthorsTableEditRowProps) => {
  const {
    data,
    mode,
    localization,
    onEditingApproved,
    onEditingCanceled,
  } = props

  const { values, errors, handleChange, submitForm } = useFormik<
    Partial<Author>
  >({
    initialValues: {
      name: data?.name ?? "",
    },
    validate: authorValidation,
    validateOnChange: true,
    onSubmit: async (values, actions) => {
      await onEditingApproved(mode, values, data)
      actions.setSubmitting(false)
    },
  })

  const handleEditCanceled = useCallback(() => onEditingCanceled(mode), [
    mode,
    onEditingCanceled,
  ])

  return (
    <TableRow>
      <TableCell>
        <Grid container={true} wrap="nowrap">
          <IconButton
            color="inherit"
            title={localization.saveTooltip}
            onClick={submitForm}
          >
            <IconCheck color="inherit" />
          </IconButton>
          <IconButton
            color="inherit"
            title={localization.cancelTooltip}
            onClick={handleEditCanceled}
          >
            <IconClear color="inherit" />
          </IconButton>
        </Grid>
      </TableCell>
      <TableCell colSpan={["add", "delete"].includes(mode) ? 2 : undefined}>
        {["add", "update"].includes(mode) && (
          <TextField
            autoFocus={true}
            type="text"
            name="name"
            error={"name" in errors}
            value={values.name}
            helperText={errors.name}
            fullWidth={true}
            variant="standard"
            placeholder="Имя"
            onChange={handleChange}
          />
        )}
        {mode === "delete" && (
          <Typography component="p" variant="body1">
            {localization.deleteText}
          </Typography>
        )}
      </TableCell>
      {mode === "update" && data && data.inserted_at && (
        <TableCell>
          <TextField
            type="text"
            name="inserted_at"
            defaultValue={format(
              new Date(data.inserted_at),
              "dd.MM.yyyy HH:mm",
            )}
            fullWidth={true}
            variant="standard"
            disabled={true}
          />
        </TableCell>
      )}
    </TableRow>
  )
}

function authorValidation(values: Partial<Author>) {
  const errors: FormikErrors<Author> = {}

  if (!values.name) {
    errors.name = "Имя автора не указано"
  }

  return errors
}
