import { createStyles, withStyles, TableRow, Theme } from "@material-ui/core"

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default,
      },
    },
  }),
)(TableRow)
