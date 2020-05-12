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

type AuthorsTableProps = {
  isLoading: boolean
  data: Tag[]
  pagination: Pagination
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (pageSize: number) => void
  onOrderChange: (orderBy: keyof Tag, orderDirection: OrderDirection) => void
  onRowAdd: (tag: Tag) => Promise<void>
  onRowDelete: (tag: Tag) => Promise<void>
}

export const AuthorsTable = memo(function AuthorsTable(
  props: AuthorsTableProps,
) {
  const {} = props
  return <h1>Table</h1>
})

const columns = [
  {
    field: "name",
    label: "Имя",
  },
  {
    field: "inserted_at",
    label: "Дата создания",
  },
]
