import React, { useState, useCallback, SyntheticEvent, FormEvent } from "react"
import { useRouter } from 'react-router5'
import {
  Grid,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core"
import { tagsAPI, Tag } from "@api/tags"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}))

export const TagsCreatePage = () => {
  const router = useRouter()
  const classes = useStyles()

  const [tag, setTag] = useState<Tag>({
    name: "",
  })

  const handleChangeField = useCallback(
    (field: keyof Tag) => (event: SyntheticEvent<{ value: string }>) => {
      setTag({ ...tag, ...{ [field]: event.currentTarget.value } })
    },
    [tag, setTag],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()

      const response = await tagsAPI.create(tag.name)

      if (response.status === 201) {
        router.navigate('admin.dictionaries.tags')
      }
    },
    [tag.name],
  )

  return (
    <Container maxWidth="md">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <Typography component="h1" variant="h4" gutterBottom={false}>
            Новый тэг
          </Typography>
        </Grid>
        <Grid item={true} xs={12}>
          <Paper className={classes.paper} variant="elevation">
            <form onSubmit={handleSubmit}>
              <Grid container={true} spacing={2}>
                <Grid item={true} xs={12}>
                  <TextField
                    id="name"
                    fullWidth={true}
                    label="Наименование"
                    value={tag.name}
                    variant="outlined"
                    onChange={handleChangeField("name")}
                  />
                </Grid>
                <Grid item={true} xs={12} container={true} justify="flex-end">
                  <Button type="submit" variant="contained" color="primary">
                    Сохранить
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
