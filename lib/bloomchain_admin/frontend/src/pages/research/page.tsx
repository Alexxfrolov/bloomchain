import nanoid from "nanoid"
import React, { useState, useCallback, FormEvent } from "react"
import {
  withStyles,
  createStyles,
  Grid,
  Container,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  IconButton,
  Theme,
} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { ConditionalList } from "@ui"

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default,
      },
    },
  }),
)(TableRow)

interface Research {
  id: number
  image: string
  pdf: string
}

export const ResearchPage = () => {
  const [data, setData] = useState<Research[]>()

  const handleChangeFormField = useCallback(() => {}, [])

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault()
  }, [])

  return (
    <Container maxWidth="md">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <Typography component="h1" variant="h4" gutterBottom={false}>
            Исследования
          </Typography>
        </Grid>
        <Grid item={true} xs={12}>
          <form onSubmit={handleSubmit}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell component="th">Миниатюра</StyledTableCell>
                    <StyledTableCell component="th">PDF</StyledTableCell>
                    <StyledTableCell component="th">Действия</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <ConditionalList
                    list={data}
                    renderExists={(list) =>
                      list.map((item) => (
                        <StyledTableRow key={nanoid()}>
                          <StyledTableCell>{item.image}</StyledTableCell>
                          <StyledTableCell>{item.pdf}</StyledTableCell>
                          <StyledTableCell>
                            <Grid container={true} spacing={1}>
                              <IconButton edge="start" color="inherit">
                                <EditIcon />
                              </IconButton>
                              <IconButton edge="start" color="inherit">
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    }
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </form>
        </Grid>
      </Grid>
    </Container>
  )
}
