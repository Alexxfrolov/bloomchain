import nanoid from "nanoid"
import React, { useEffect, useState, useCallback } from "react"
import format from "date-fns/format"
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
import { ConditionalList } from "@ui"
import { tagsAPI, Tag } from "@api/tags"
import { RouterLink } from "@features/core"

export const TagsViewPage = () => {
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const response = await tagsAPI.get()
        setTags(response.data.data)
      } catch {
        setError(true)
      }

      setLoading(false)
    }
    fetchData()
  }, [])

  // const handleChangePagination = useCallback(
  //   (event: SyntheticEvent, value: number) => {
  //     setPagination({
  //       ...pagination,
  //       page: value,
  //     })
  //   },
  //   [pagination, setPagination],
  // )

  const handleClickDeleteButton = useCallback(
    (id: number) => async () => {
      const response = await tagsAPI.remove(id)

      if (response.status === 204) {
        setTags(tags.filter((tag) => tag.id !== id))
      }
    },
    [tags, setTags],
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
                        <TableCell>
                          {
                            tag.updatedAt?.[
                              format(
                                new Date(tag.tag.updatedAt),
                                "dd.mm.yyyy hh:mm",
                              )
                            ]
                          }
                        </TableCell>
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
      </Grid>
    </Container>
  )
}
