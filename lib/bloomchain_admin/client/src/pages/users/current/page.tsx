import React, {
  memo,
  Fragment,
  useState,
  useMemo,
  useCallback,
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
import { User } from "@api/user"
import { useCurrentUser } from "@features/core"

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

export const UserAccountPage = memo(function UserAccountPage() {
  const { user, update } = useCurrentUser()
  const classes = useStyles()

  const [settings, setSettings] = useState<User>({ ...user })
  const [openedSuccessDialog, setOpenedSuccessDialog] = useState(false)

  const handleChangeField = useCallback(
    (field: keyof User) => (event: SyntheticEvent<{ value: string }>) => {
      setSettings({ ...settings, ...{ [field]: event.currentTarget.value } })
    },
    [settings, setSettings],
  )

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      update(settings)
      setOpenedSuccessDialog(true)
    },
    [settings, update],
  )

  const avatarCaption = useMemo(
    () =>
      settings.first_name
        .charAt(0)
        .toUpperCase()
        .concat(settings.last_name.charAt(0).toUpperCase()),
    [settings.first_name, settings.last_name],
  )

  return (
    <Fragment>
      <Container maxWidth="sm">
        <Paper className={classes.paper} variant="elevation">
          <form
            onSubmit={handleSubmit}
            className={classes.root}
            noValidate={true}
          >
            <Grid container={true} spacing={3}>
              <Grid item={true}>
                <Avatar className={classes.avatar}>{avatarCaption}</Avatar>
              </Grid>
              <Grid item={true} xs={12} sm>
                <TextField
                  label="Имя"
                  id="name"
                  value={settings.first_name}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={handleChangeField("first_name")}
                />
                <TextField
                  label="Фамилия"
                  id="name"
                  value={settings.last_name}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={handleChangeField("last_name")}
                />
                <TextField
                  label="Должность"
                  id="job"
                  value={settings.job ?? ""}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={handleChangeField("job")}
                />
                <TextField
                  label="Телефон"
                  id="phone"
                  type="tel"
                  value={settings.phone ?? ""}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={handleChangeField("phone")}
                />
                <TextField
                  label="Email"
                  id="email"
                  type="email"
                  value={settings.email}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={handleChangeField("email")}
                />
              </Grid>
              <Grid item={true} xs={12}>
                <Grid container={true} justify="flex-end">
                  <Button type="submit" variant="contained" color="primary">
                    Сохранить
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <SuccessDialog
        isOpened={openedSuccessDialog}
        onClose={() => setOpenedSuccessDialog(false)}
      />
    </Fragment>
  )
})

type SuccessDialogProps = {
  isOpened: boolean
  onClose: () => void
}

const SuccessDialog = memo(function SuccessDialog(props: SuccessDialogProps) {
  const { isOpened, onClose } = props
  return (
    <Dialog open={isOpened} onClose={onClose}>
      <DialogTitle>Данные успешно сохранены</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  )
})
