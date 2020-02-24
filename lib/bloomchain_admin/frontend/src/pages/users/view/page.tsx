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

export const UsersViewPage = () => {
  return (
    <Container maxWidth="md">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <Typography component="h1" variant="h4" gutterBottom={false}>
            Пользователи
          </Typography>
        </Grid>
        <Grid item={true} xs={12}>
          <Button
            variant="contained"
            color="primary"
            component={(props) => (
              <RouterLink
                routeName="admin.management.users.create"
                {...props}
              />
            )}
          >
            Новый пользователь
          </Button>
        </Grid>
        <Grid item={true} xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell component="th">E-mail</TableCell>
                  <TableCell component="th">Роль</TableCell>
                  <TableCell component="th">Статус</TableCell>
                  <TableCell component="th">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>admin@admin.local</TableCell>
                  <TableCell>admin</TableCell>
                  <TableCell>Активен</TableCell>
                  <TableCell>
                    <IconButton
                      edge="start"
                      color="inherit"
                      component={(props) => (
                        <RouterLink
                          routeName="admin.management.users.edit"
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