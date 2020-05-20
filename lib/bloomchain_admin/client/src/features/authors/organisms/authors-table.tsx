import React, { Fragment, memo, useCallback } from "react"
import { useFormik } from "formik"
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

import { AuthorCreationSchema } from "../schemes"

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

  const notEmptyData = !!data.length

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
        sorting: notEmptyData,
        paging: notEmptyData,
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
    render: (author) => format(new Date(author.inserted_at), "dd.MM.yyyy"),
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
    author?: Author,
  ) => Promise<void>
  onEditingApproved: (
    mode: TableRowActionMode,
    newData: Partial<Author>,
    oldData?: Author,
  ) => Promise<void>
}

const AuthorsTableEditRow = memo((props: AuthorsTableEditRowProps) => {
  const {
    data,
    mode,
    localization,
    onEditingApproved,
    onEditingCanceled,
  } = props

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    submitForm,
  } = useFormik<Partial<Author>>({
    initialValues: {
      name: data?.name ?? "",
    },
    initialTouched: {
      name: false,
    },
    validationSchema: AuthorCreationSchema,
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
      {["add", "update"].includes(mode) && (
        <Fragment>
          <TableCell>
            <TextField
              autoFocus={true}
              type="text"
              name="name"
              value={values.name}
              error={"name" in errors && touched.name}
              helperText={touched.name ? errors.name : undefined}
              fullWidth={true}
              variant="standard"
              placeholder="Имя"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </TableCell>
          <TableCell>
            <TextField
              type="text"
              name="inserted_at"
              defaultValue={format(
                new Date(data?.inserted_at ?? new Date()),
                "dd.MM.yyyy",
              )}
              fullWidth={true}
              variant="standard"
              disabled={true}
            />
          </TableCell>
        </Fragment>
      )}
      {mode === "delete" && (
        <TableCell colSpan={2}>
          (
          <Typography component="p" variant="body1">
            {localization.deleteText}
          </Typography>
          )}
        </TableCell>
      )}
    </TableRow>
  )
})
