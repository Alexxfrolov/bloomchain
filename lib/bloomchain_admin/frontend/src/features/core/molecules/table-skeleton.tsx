import nanoid from "nanoid"
import React, { Fragment } from "react"
import { Skeleton } from "@material-ui/lab"

import { StyledTableRow } from "./table-row"
import { StyledTableCell } from "./table-cell"

type TableSkeletonProps = {
  colSpan: number
  length?: number
}

export const TableSkeleton = ({ colSpan, length = 20 }: TableSkeletonProps) => (
  <Fragment>
    {Array.from({ length }).map(() => (
      <StyledTableRow key={nanoid()}>
        <StyledTableCell colSpan={colSpan} padding="none">
          <Skeleton variant="rect" width="100%" height="53px" />
        </StyledTableCell>
      </StyledTableRow>
    ))}
  </Fragment>
)
