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
import { Tag } from "@api/tags"
import { Table } from "@features/core"

type TagsTableProps = {
  isLoading: boolean
  data: Tag[]
  pagination: Pagination
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (pageSize: number) => void
  onOrderChange: (orderBy: keyof Tag, orderDirection: OrderDirection) => void
  onRowAdd: (tag: Tag) => Promise<void>
  onRowDelete: (tag: Tag) => Promise<void>
}

export const TagsTable = memo(function TagsTable(props: TagsTableProps) {
  const {
    data,
    isLoading,
    pagination,
    onChangePage,
    onChangeRowsPerPage,
    onOrderChange,
    onRowAdd,
    onRowDelete,
  } = props

  const handleOrderChange = useCallback(
    (orderBy: number, orderDirection: OrderDirection) => {
      const { field } = columns[orderBy]
      onOrderChange(field as keyof Tag, orderDirection)
    },
    [onOrderChange],
  )

  const handleRowAdd = useCallback((tag) => onRowAdd(tag), [onRowAdd])

  const handleRowDelete = useCallback((tag) => onRowDelete(tag), [onRowDelete])

  return (
    <Table
      title="Тэги"
      data={data}
      columns={columns}
      isLoading={isLoading}
      page={pagination.page - 1}
      totalCount={pagination.total_items}
      components={{
        EditRow: TagsTableEditRow,
      }}
      options={{
        addRowPosition: "first",
        search: false,
        sorting: true,
        thirdSortClick: false,
        paginationType: "stepped",
        pageSize: pagination.page_size,
        pageSizeOptions: pagination.page_size_options,
        emptyRowsWhenPaging: false,
      }}
      editable={{
        isDeletable: (tag) => tag.deletable,
        onRowAdd: handleRowAdd,
        onRowDelete: handleRowDelete,
      }}
      onOrderChange={handleOrderChange}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  )
})

const columns: Column<Tag>[] = [
  {
    title: "Наименование",
    field: "name",
  },
  {
    title: "Описание",
    field: "slug",
  },
  {
    title: "Дата создания",
    field: "inserted_at",
    defaultSort: "desc",
    render: (rowData) =>
      format(new Date(rowData.inserted_at), "dd.MM.yyyy HH:mm"),
  },
  {
    title: "Дата обновления",
    field: "updated_at",
    render: (rowData) =>
      format(new Date(rowData.inserted_at), "dd.MM.yyyy HH:mm"),
  },
]

type TableRowActionMode = "add" | "delete" | "update"

type TagsTableEditRowProps = {
  data?: Tag
  mode: TableRowActionMode
  localization: {
    saveTooltip: string
    cancelTooltip: string
    deleteText: string
  }
  onEditingCanceled: (mode: TableRowActionMode, rowData?: Tag) => Promise<void>
  onEditingApproved: (
    mode: TableRowActionMode,
    newData: Partial<Tag>,
    oldData?: Tag,
  ) => Promise<void>
}

const TagsTableEditRow = (props: TagsTableEditRowProps) => {
  const {
    data,
    mode,
    localization,
    onEditingApproved,
    onEditingCanceled,
  } = props

  const { values, errors, handleChange, submitForm } = useFormik<Partial<Tag>>({
    initialValues: {
      name: data?.name ?? "",
    },
    validate: tagValidation,
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
      <TableCell colSpan={4}>
        {mode === "add" && (
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
    </TableRow>
  )
}

function tagValidation(values: Partial<Tag>) {
  const errors: FormikErrors<Tag> = {}

  if (!values.name) {
    errors.name = "Имя тэга не указано"
  }

  return errors
}
