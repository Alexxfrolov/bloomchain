import React, { useState, useCallback, FormEvent, SyntheticEvent } from "react"
import {
  Container,
  Grid,
  Paper,
  TextField,
  Avatar,
  Button,
  makeStyles,
} from "@material-ui/core"
import { deepOrange } from "@material-ui/core/colors"
import { Author } from "@api/authors"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: deepOrange[500],
  },
}))

export const UserAccountPage = () => {
  const classes = useStyles()

  const [settings, setSettings] = useState<Author>({
    firstname: "",
    middlename: "",
    lastname: "",
    appointment: "",
    tel: "",
    email: "",
  })

  const handleChangeField = useCallback(
    (field: keyof Author) => (event: SyntheticEvent<{ value: string }>) => {
      setSettings({ ...settings, ...{ [field]: event.target.value } })
    },
    [settings, setSettings],
  )

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault()
  }, [])

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper className={classes.paper} variant="elevation">
        <form onSubmit={handleSubmit}>
          <Grid container={true} spacing={4}>
            <Grid item={true}>
              <Avatar className={classes.avatar}>AD</Avatar>
            </Grid>
            <Grid item={true} xs={12} sm container={true} spacing={4}>
              <Grid item={true} container={true} spacing={4}>
                <Grid item={true} xs={6}>
                  <TextField
                    label="Имя"
                    id="firstname"
                    value={settings.firstname}
                    required={true}
                    fullWidth={true}
                    variant="outlined"
                    onChange={handleChangeField("firstname")}
                  />
                </Grid>
                <Grid item={true} xs={6}>
                  <TextField
                    label="Фамилия"
                    id="lastname"
                    value={settings.lastname}
                    required={true}
                    fullWidth={true}
                    variant="outlined"
                    onChange={handleChangeField("lastname")}
                  />
                </Grid>
              </Grid>
              <Grid item={true} container={true} spacing={4}>
                <Grid item={true} xs={6}>
                  <TextField
                    label="Должность"
                    id="name"
                    value={settings.appointment}
                    required={true}
                    fullWidth={true}
                    variant="outlined"
                    onChange={handleChangeField("appointment")}
                  />
                </Grid>
                <Grid item={true} xs={6}>
                  <TextField
                    label="Телефон"
                    id="tel"
                    type="tel"
                    fullWidth={true}
                    value={settings.tel}
                    variant="outlined"
                    onChange={handleChangeField("tel")}
                  />
                </Grid>
              </Grid>
              <Grid item={true} container={true} spacing={4}>
                <Grid item={true} xs={6}>
                  <TextField
                    label="Email"
                    id="email"
                    type="email"
                    fullWidth={true}
                    value={settings.email}
                    variant="outlined"
                    onChange={handleChangeField("email")}
                  />
                </Grid>
                <Grid item={true} xs={6} container={true} justify="flex-end">
                  <Button type="submit" variant="contained" color="primary">
                    Сохранить
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
