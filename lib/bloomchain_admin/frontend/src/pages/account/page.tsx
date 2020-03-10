import React, {
  Fragment,
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
  Dialog,
  DialogTitle,
  DialogActions,
  makeStyles,
} from "@material-ui/core"
import { deepOrange } from "@material-ui/core/colors"
import { usersApi, User } from "@api/user"
import { AccountContext, ErrorDialog } from "@features/core"

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
  const [openedSuccessDialog, setOpenedSuccessDialog] = useState(false)
  const [openedErrorDialog, setOpenedErrorDialog] = useState(false)

  const handleChangeField = useCallback(
    (field: keyof User) => (event: SyntheticEvent<{ value: string }>) => {
      setSettings({ ...settings, ...{ [field]: event.currentTarget.value } })
    },
    [settings, setSettings],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      try {
        await usersApi.update(settings)
        setOpenedSuccessDialog(true)
      } catch {
        setOpenedErrorDialog(true)
      }
    },
    [settings, setOpenedSuccessDialog, setOpenedErrorDialog],
  )

  return (
    <Fragment>
      <Container maxWidth="sm">
        <Paper className={classes.paper} variant="elevation">
          <form onSubmit={handleSubmit} className={classes.root}>
            <Grid container={true} spacing={3}>
              <Grid item={true}>
                <Avatar className={classes.avatar}>AD</Avatar>
              </Grid>
              <Grid item={true} xs={12} sm>
                <TextField
                  label="Имя"
                  id="name"
                  value={settings.first_name}
                  fullWidth={true}
                  margin="normal"
                  variant="outlined"
                  onChange={handleChangeField("first_name")}
                />
                <TextField
                  label="Фамилия"
                  id="name"
                  value={settings.last_name}
                  fullWidth={true}
                  margin="normal"
                  variant="outlined"
                  onChange={handleChangeField("last_name")}
                />
                <TextField
                  label="Должность"
                  id="job"
                  value={settings.job ?? ""}
                  fullWidth={true}
                  margin="normal"
                  variant="outlined"
                  onChange={handleChangeField("job")}
                />
                <TextField
                  label="Телефон"
                  id="phone"
                  type="tel"
                  value={settings.phone ?? ""}
                  fullWidth={true}
                  margin="normal"
                  variant="outlined"
                  onChange={handleChangeField("phone")}
                />
                <TextField
                  label="Email"
                  id="email"
                  type="email"
                  value={settings.email ?? ""}
                  fullWidth={true}
                  margin="normal"
                  variant="outlined"
                  onChange={handleChangeField("email")}
                />
              </Grid>
              <Grid item={true} xs={12}>
                <Grid container={true} justify="flex-end">
                  <Button type="submit" variant="contained" color="primary">
                    Обновить
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <SuccessDialog
        opened={openedSuccessDialog}
        onClose={() => setOpenedSuccessDialog(false)}
      />
      <ErrorDialog
        opened={openedErrorDialog}
        onClose={() => setOpenedErrorDialog(false)}
      />
    </Fragment>
  )
}

type SuccessDialogProps = {
  opened: boolean
  onClose: () => void
}

const SuccessDialog = ({ opened, onClose }: SuccessDialogProps) => (
  <Dialog open={opened} onClose={onClose}>
    <DialogTitle>Статья успешно сохранена</DialogTitle>
    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus>
        Закрыть
      </Button>
    </DialogActions>
  </Dialog>
)
