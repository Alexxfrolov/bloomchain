import nanoid from "nanoid"
import React, { useEffect, useState, useCallback, SyntheticEvent } from "react"
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
import DeleteIcon from "@material-ui/icons/Delete"
import { Pagination } from "@material-ui/lab"
import { ConditionalList } from "@ui"
import { tagsAPI, Tag } from "@api/tags"
import { RouterLink } from "@features/core"

export const TagsViewPage = () => {
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    perPage: 20,
  })
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const response = await tagsAPI.get(pagination.page)
        setTags(response.data.data)
      } catch {
        setError(true)
      }

      setLoading(false)
    }
    fetchData()
  }, [pagination.page])

  const handleChangePagination = useCallback(
    (event: SyntheticEvent, value: number) => {
      setPagination({
        ...pagination,
        page: value,
      })
    },
    [pagination, setPagination],
  )

  const handleClickDeleteButton = useCallback(
    (id: number) => async () => {
      await tagsAPI.remove(id)
    },
    [],
  )

  return (
    <Container maxWidth="md">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <Typography component="h1" variant="h4" gutterBottom={false}>
            Тэги
          </Typography>
        </Grid>
        <Grid item={true} xs={12}>
          <Button
            variant="contained"
            color="primary"
            component={(props) => (
              <RouterLink
                routeName="admin.dictionaries.tags.create"
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
                  <TableCell component="th">Наименование</TableCell>
                  <TableCell component="th">Описание</TableCell>
                  <TableCell component="th">
                    Дата последнего обновления
                  </TableCell>
                  <TableCell component="th">Действия</TableCell>
                </TableRow>
              </TableHead>
              <ConditionalList
                list={tags}
                renderExists={(list) => (
                  <TableBody>
                    {list.map((tag) => (
                      <TableRow key={nanoid()}>
                        <TableCell>{tag.name}</TableCell>
                        <TableCell>{tag.slug}</TableCell>
                        <TableCell>{tag.updatedAt}</TableCell>
                        <TableCell>
                          <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClickDeleteButton(tag.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              />
            </Table>
          </TableContainer>
        </Grid>
        <Grid item={true} xs={12} container={true} justify="center">
          <Pagination
            page={pagination.page}
            count={pagination.pages}
            color="primary"
            onChange={handleChangePagination}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
