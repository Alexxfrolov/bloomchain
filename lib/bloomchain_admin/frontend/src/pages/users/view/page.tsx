import nanoid from "nanoid"
import React, { useState, useEffect, useCallback } from "react"
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
import { usersAPI, User } from "@api/user"
import { RouterLink } from "@features/core"

export const UsersViewPage = () => {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  // const [pagination, setPagination] = useState({
  //   page: 1,
  //   pages: 1,
  //   perPage: 20,
  // })
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const response = await usersAPI.get()
        setUsers(response.data.data)
      } catch {
        setError(true)
      }

      setLoading(false)
    }
    fetchData()
  }, [])

  const handleClickDeleteButton = useCallback((id: number) => async () => {
    const response = await usersAPI.remove(id)

    if (response.status === 204) {
      setUsers(users.filter(user => user.id !== id))
    }
  }, [users, setUsers])

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
                  <TableCell component="th">Имя</TableCell>
                  <TableCell component="th">E-mail</TableCell>
                  <TableCell component="th">Роль</TableCell>
                  <TableCell component="th">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={nanoid()}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton
                        edge="start"
                        color="inherit"
                        component={(props) => (
                          <RouterLink
                            routeName="admin.management.users.edit"
                            routeParams={{ id: user.id }}
                            {...props}
                          />
                        )}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="start" color="inherit" onClick={handleClickDeleteButton(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {/* <Grid item={true} xs={12} container={true} justify="center">
          <Pagination count={10} color="primary" />
        </Grid> */}
      </Grid>
    </Container>
  )
}
