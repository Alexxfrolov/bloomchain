import React, {
  useState,
  useCallback,
  useContext,
  FormEvent,
  SyntheticEvent,
} from "react"
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
import { usersApi, User } from "@api/user"
import { AccountContext } from "@features/core"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    backgroundColor: deepOrange[500],
  },
}))

export const UserAccountPage = () => {
  const account = useContext(AccountContext)
  const classes = useStyles()

  const [settings, setSettings] = useState<User>({ ...account })

  const handleChangeField = useCallback(
    (field: keyof User) => (event: SyntheticEvent<{ value: string }>) => {
      setSettings({ ...settings, ...{ [field]: event.currentTarget.value } })
    },
    [settings, setSettings],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      const response = await usersApi.update(settings)
      if (response.status === 200) {
        window.alert("Данные успешно обновлены")
      }
    },
    [settings],
  )

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Paper className={classes.paper} variant="elevation">
        <form onSubmit={handleSubmit}>
          <Grid container={true} spacing={4}>
            <Grid item={true}>
              <Avatar className={classes.avatar}>AD</Avatar>
            </Grid>
            <Grid item={true} xs={10} sm container={true} spacing={4}>
              <Grid item={true} xs={12}>
                <TextField
                  label="Имя"
                  id="name"
                  value={settings.name}
                  fullWidth={true}
                  variant="outlined"
                  onChange={handleChangeField("name")}
                />
              </Grid>
              <Grid item={true} xs={12}>
                <TextField
                  label="Должность"
                  id="job"
                  value={settings.job || ""}
                  fullWidth={true}
                  variant="outlined"
                  onChange={handleChangeField("job")}
                />
              </Grid>
              <Grid item={true} xs={12}>
                <TextField
                  label="Телефон"
                  id="phone"
                  type="tel"
                  fullWidth={true}
                  value={settings.phone || ""}
                  variant="outlined"
                  onChange={handleChangeField("phone")}
                />
              </Grid>
              <Grid item={true} xs={12}>
                <TextField
                  label="Email"
                  id="email"
                  type="email"
                  fullWidth={true}
                  value={settings.email || ""}
                  variant="outlined"
                  onChange={handleChangeField("email")}
                />
              </Grid>
            </Grid>
            <Grid item={true} xs={12} container={true} justify="flex-end">
              <Button type="submit" variant="contained" color="primary">
                Обновить
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}