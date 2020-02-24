import React from "react"
import {
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
} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import Pagination from "@material-ui/lab/Pagination"
import { RouterLink } from "@features/core"

export const AuthorsViewPage = () => {
  return (
    <Container maxWidth="md">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <Typography component="h1" variant="h4" gutterBottom={false}>
            Авторы
          </Typography>
        </Grid>
        <Grid item={true} xs={12}>
          <Button
            variant="contained"
            color="primary"
            component={(props) => (
              <RouterLink
                routeName="admin.dictionaries.authors.create"
                {...props}
              />
            )}
          >
            Новый тэг
          </Button>
        </Grid>
        <Grid item={true} xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell component="th">Имя</TableCell>
                  <TableCell component="th">Фамилия</TableCell>
                  <TableCell component="th">Должность</TableCell>
                  <TableCell component="th">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Иван</TableCell>
                  <TableCell>Иванов</TableCell>
                  <TableCell>Главный редактор</TableCell>
                  <TableCell>
                    <IconButton
                      edge="start"
                      color="inherit"
                      component={(props) => (
                        <RouterLink
                          routeName="admin.dictionaries.authors.edit"
                          {...props}
                        />
                      )}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="start" color="inherit">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item={true} xs={12} container={true} justify="center">
          <Pagination count={10} color="primary" />
        </Grid>
      </Grid>
    </Container>
  )
}