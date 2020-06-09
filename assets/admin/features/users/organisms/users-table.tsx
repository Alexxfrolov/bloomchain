import React, { memo, useCallback, Fragment } from "react"
import { useFormik } from "formik"
import format from "date-fns/format"
import {
  Grid,
  Typography,
  TableRow,
  Select,
  TableCell,
  TextField,
  IconButton,
  MenuItem,
} from "@material-ui/core"
import { Column } from "material-table"
import IconCheck from "@material-ui/icons/Check"
import IconClear from "@material-ui/icons/Clear"
import { Pagination, OrderDirection } from "@api/common"
import { User } from "@api/user"
import { Table, TableRowActionMode } from "@features/core"

import { UserCreationSchema } from "../schemes"

type UsersTableProps = {
  isLoading: boolean
  data: User[]
  pagination: Pagination
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (pageSize: number) => void
  onOrderChange: (orderBy: keyof User, orderDirection: OrderDirection) => void
  onRowAdd: (user: Partial<User>) => Promise<void>
  onRowDelete: (user: User) => Promise<void>
  onRowUpdate: (user: User) => Promise<void>
}

export const UsersTable = memo(function UsersTable(props: UsersTableProps) {
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
      onOrderChange(field as keyof User, orderDirection)
    },
    [onOrderChange],
  )

  const handleRowAdd = useCallback((user: User) => onRowAdd(user), [onRowAdd])

  const handleRowUpdate = useCallback(
    (newData: User, oldData?: User) => onRowUpdate({ ...oldData, ...newData }),
    [onRowUpdate],
  )

  const handleRowDelete = useCallback((user: User) => onRowDelete(user), [
    onRowDelete,
  ])

  const notEmptyData = !!data.length

  return (
    <Table
      title="Пользователи"
      data={data}
      columns={columns}
      isLoading={isLoading}
      page={pagination.page - 1}
      totalCount={pagination.total_items}
      components={{
        EditRow: UsersTableEditRow,
      }}
      options={{
        sorting: notEmptyData,
        paging: notEmptyData,
        pageSize: pagination.page_size,
        pageSizeOptions: pagination.page_size_options,
      }}
      editable={{
        isEditable: (user) => user.editable,
        isDeletable: (user) => user.deletable,
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

const columns: Column<User>[] = [
  {
    title: "Имя",
    field: "first_name",
  },
  {
    title: "Фамилия",
    field: "last_name",
  },
  {
    title: "Роль",
    field: "role",
  },
  {
    title: "Должность",
    field: "job",
  },
  {
    title: "Телефон",
    field: "phone",
  },
  {
    title: "E-mail",
    field: "email",
  },
  {
    title: "Дата создания",
    field: "inserted_at",
    defaultSort: "desc",
    render: (user) => format(new Date(user.inserted_at), "dd.MM.yyyy"),
  },
]

type UsersTableEditRowProps = {
  data?: User
  mode: TableRowActionMode
  localization: {
    saveTooltip: string
    cancelTooltip: string
    deleteText: string
  }
  onEditingCanceled: (mode: TableRowActionMode, user?: User) => Promise<void>
  onEditingApproved: (
    mode: TableRowActionMode,
    newData: Partial<User>,
    oldData?: User,
  ) => Promise<void>
}

const UsersTableEditRow = (props: UsersTableEditRowProps) => {
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
  } = useFormik<Partial<User>>({
    initialValues: {
      first_name: data?.first_name ?? "",
      last_name: data?.last_name ?? "",
      role: data?.role ?? "writer",
      job: data?.job ?? "",
      email: data?.email ?? "",
      phone: data?.phone ?? "",
      inserted_at: data?.inserted_at ?? new Date(),
    },
    validationSchema: UserCreationSchema,
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
              name="first_name"
              value={values.first_name}
              error={"first_name" in errors && touched.first_name}
              helperText={touched.first_name ? errors.first_name : undefined}
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
              name="last_name"
              value={values.last_name}
              error={"last_name" in errors && touched.last_name}
              helperText={touched.last_name ? errors.last_name : undefined}
              fullWidth={true}
              variant="standard"
              placeholder="Фамилия"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </TableCell>
          <TableCell>
            <Select
              name="role"
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value="admin">Админ</MenuItem>
              <MenuItem value="writer">Автор</MenuItem>
            </Select>
          </TableCell>
          <TableCell>
            <TextField
              type="text"
              name="job"
              value={values.job}
              error={"job" in errors && touched.job}
              helperText={touched.job ? errors.job : undefined}
              fullWidth={true}
              variant="standard"
              placeholder="Должность"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </TableCell>
          <TableCell>
            <TextField
              type="text"
              name="phone"
              value={values.phone}
              error={"phone" in errors && touched.phone}
              helperText={touched.phone ? errors.job : undefined}
              fullWidth={true}
              variant="standard"
              placeholder="Телефон"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </TableCell>
          <TableCell>
            <TextField
              type="text"
              name="email"
              value={values.email}
              error={"email" in errors && touched.email}
              helperText={touched.email ? errors.email : undefined}
              fullWidth={true}
              variant="standard"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </TableCell>
          <TableCell>
            <TextField
              type="text"
              name="inserted_at"
              defaultValue={format(
                new Date(values.inserted_at ?? new Date()),
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
        <TableCell colSpan={7}>
          <Typography component="p" variant="body1">
            {localization.deleteText}
          </Typography>
        </TableCell>
      )}
    </TableRow>
  )
}
