import React, { useState, useCallback, SyntheticEvent, FormEvent } from "react"
import {
  Grid,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core"
import { Author } from "@api/authors"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}))

export const AuthorsCreatePage = () => {
  const classes = useStyles()

  const [author, setAuthor] = useState<Author>({
    firstname: "",
    middlename: "",
    lastname: "",
    appointment: "",
    tel: "",
    email: "",
  })

  const handleChangeField = useCallback(
    (field: keyof Author) => (event: SyntheticEvent<{ value: string }>) => {
      setAuthor({ ...author, ...{ [field]: event.currentTarget.value } })
    },
    [author, setAuthor],
  )

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault()
  }, [])

  return (
    <Container maxWidth="md">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <Typography component="h1" variant="h4" gutterBottom={false}>
            Новый автор
          </Typography>
        </Grid>
        <Grid item={true} xs={12}>
          <Paper className={classes.paper} variant="elevation">
            <form onSubmit={handleSubmit}>
              <Grid container={true} spacing={2}>
                <Grid item={true} xs={12}>
                  <TextField
                    id="firstname"
                    fullWidth={true}
                    label="Фамилия"
                    value={author.firstname}
                    variant="outlined"
                    onChange={handleChangeField("firstname")}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <TextField
                    id="middlename"
                    fullWidth={true}
                    label="Имя"
                    value={author.middlename}
                    variant="outlined"
                    onChange={handleChangeField("middlename")}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <TextField
                    id="lastname"
                    fullWidth={true}
                    label="Отчество"
                    value={author.lastname}
                    variant="outlined"
                    onChange={handleChangeField("lastname")}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <TextField
                    id="appointment"
                    fullWidth={true}
                    label="Должность"
                    value={author.appointment}
                    variant="outlined"
                    onChange={handleChangeField("appointment")}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <TextField
                    id="tel"
                    fullWidth={true}
                    label="Телефон"
                    value={author.tel}
                    variant="outlined"
                    onChange={handleChangeField("tel")}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <TextField
                    id="email"
                    fullWidth={true}
                    label="E-mail"
                    value={author.email}
                    variant="outlined"
                    onChange={handleChangeField("email")}
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
