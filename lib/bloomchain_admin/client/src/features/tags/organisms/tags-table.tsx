import React, { memo, useMemo, useCallback } from "react"
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
import { Tag } from "@api/tags"
import { Table, TableRowActionMode } from "@features/core"

import { TagCreationSchema } from "../schemes"

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

  const handleRowAdd = useCallback((tag: Tag) => onRowAdd(tag), [onRowAdd])

  const handleRowDelete = useCallback((tag: Tag) => onRowDelete(tag), [
    onRowDelete,
  ])

  const notEmptyData = useMemo(() => !!data.length, [data])

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
        sorting: notEmptyData,
        paging: notEmptyData,
        pageSize: pagination.page_size,
        pageSizeOptions: pagination.page_size_options,
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
    render: (tag) => format(new Date(tag.inserted_at), "dd.MM.yyyy"),
  },
  {
    title: "Дата обновления",
    field: "updated_at",
    render: (tag) => format(new Date(tag.inserted_at), "dd.MM.yyyy"),
  },
]

type TagsTableEditRowProps = {
  data?: Tag
  mode: TableRowActionMode
  localization: {
    saveTooltip: string
    cancelTooltip: string
    deleteText: string
  }
  onEditingCanceled: (mode: TableRowActionMode, tag?: Tag) => Promise<void>
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

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    submitForm,
  } = useFormik<Partial<Tag>>({
    enableReinitialize: true,
    initialValues: {
      name: data?.name ?? "",
    },
    initialTouched: {
      name: false,
    },
    validationSchema: TagCreationSchema,
    validateOnBlur: false,
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
            value={values.name}
            error={"name" in errors && touched.name}
            helperText={touched.name ? errors.name : undefined}
            fullWidth={true}
            variant="standard"
            placeholder="Имя"
            onChange={handleChange}
            onBlur={handleBlur}
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
