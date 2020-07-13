import React, { useCallback } from "react"
import { useFormik } from "formik"
import format from "date-fns/format"
import {
  Grid,
  TableRow,
  TableCell,
  TextField,
  IconButton,
} from "@material-ui/core"
import { Column } from "material-table"
import IconCheck from "@material-ui/icons/Check"
import IconClear from "@material-ui/icons/Clear"
import type { Pagination, OrderDirection } from "@api/common"
import type { Section } from "@api/sections"
import { Table, TableRowActionMode } from "@features/core"

import { SectionSchema } from "../schemes"

type SectionsTableProps = {
  isLoading: boolean
  data: Section[]
  pagination: Pagination
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (pageSize: number) => void
  onOrderChange: (
    orderBy: keyof Section,
    orderDirection: OrderDirection,
  ) => void
  onRowUpdate: (author: Section) => Promise<void>
}

export function SectionsTable(props: SectionsTableProps) {
  const {
    data,
    isLoading,
    pagination,
    onChangePage,
    onChangeRowsPerPage,
    onOrderChange,
    onRowUpdate,
  } = props

  const handleOrderChange = useCallback(
    (orderBy: number, orderDirection: OrderDirection) => {
      const { field } = columns[orderBy]
      onOrderChange(field as keyof Section, orderDirection)
    },
    [onOrderChange],
  )

  const handleRowUpdate = useCallback(
    (newData: Section, oldData?: Section) =>
      onRowUpdate({ ...oldData, ...newData }),
    [onRowUpdate],
  )

  const notEmptyData = !!data.length

  return (
    <Table
      title="Разделы"
      data={data}
      columns={columns}
      isLoading={isLoading}
      page={pagination.page - 1}
      totalCount={pagination.total_items}
      components={{
        EditRow: SectionsTableEditRow,
      }}
      options={{
        sorting: notEmptyData,
        paging: notEmptyData,
        pageSize: pagination.page_size,
        pageSizeOptions: pagination.page_size_options,
      }}
      editable={{
        onRowUpdate: handleRowUpdate,
      }}
      onOrderChange={handleOrderChange}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  )
}

const columns: Column<Section>[] = [
  {
    field: "name",
    title: "Наименование",
  },
  {
    field: "seo_settings.title",
    title: "Заголовок",
    sorting: false,
  },
  {
    field: "seo_settings.description",
    title: "Описание",
    sorting: false,
  },
  {
    field: "inserted_at",
    title: "Дата создания",
    render: (srction) => format(new Date(srction.inserted_at), "dd.MM.yyyy"),
  },
  {
    field: "updated_at",
    title: "Дата обновления",
    render: (srction) => format(new Date(srction.updated_at), "dd.MM.yyyy"),
  },
]

type SectionsTableEditRowProps = {
  data: Section
  mode: TableRowActionMode
  localization: {
    saveTooltip: string
    cancelTooltip: string
    deleteText: string
  }
  onEditingCanceled: (
    mode: TableRowActionMode,
    section?: Section,
  ) => Promise<void>
  onEditingApproved: (
    mode: TableRowActionMode,
    newData: Partial<Section>,
    oldData: Section,
  ) => Promise<void>
}

const SectionsTableEditRow = (props: SectionsTableEditRowProps) => {
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
  } = useFormik<Section>({
    enableReinitialize: true,
    initialValues: {
      ...data,
    },
    validationSchema: SectionSchema,
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
          placeholder="Наименование"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="text"
          name="seo_settings.title"
          multiline={true}
          value={values.seo_settings.title}
          error={!!errors.seo_settings?.title && touched.seo_settings?.title}
          helperText={
            touched.seo_settings?.title ? errors.seo_settings?.title : undefined
          }
          inputProps={{ maxLength: 255 }}
          fullWidth={true}
          variant="standard"
          placeholder="Заголовок"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="text"
          name="name"
          multiline={true}
          value={values.seo_settings.description}
          error={
            !!errors.seo_settings?.description &&
            touched.seo_settings?.description
          }
          helperText={
            touched.seo_settings?.description
              ? errors.seo_settings?.description
              : undefined
          }
          inputProps={{ maxLength: 255 }}
          fullWidth={true}
          variant="standard"
          placeholder="Описание"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="text"
          name="inserted_at"
          defaultValue={format(new Date(data.inserted_at), "dd.MM.yyyy")}
          fullWidth={true}
          variant="standard"
          disabled={true}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="text"
          name="updated_at"
          defaultValue={format(new Date(data.updated_at), "dd.MM.yyyy")}
          fullWidth={true}
          variant="standard"
          disabled={true}
        />
      </TableCell>
    </TableRow>
  )
}
