import React, { memo, Fragment, useState, useCallback } from "react"
import { useFormik } from "formik"
import {
  Container,
  Grid,
  Paper,
  TextField,
  Avatar,
  Button,
  makeStyles,
} from "@material-ui/core"
import { indigo } from "@material-ui/core/colors"
import { User } from "@api/user"
import { useCurrentUser, SuccessDialog } from "@features/core"
import { UserEditSchema } from "@features/users"

export const UserAccountPage = memo(function UserAccountPage() {
  const { user, update } = useCurrentUser()
  const classes = useStyles()

  const [openedSuccessDialog, setOpenedSuccessDialog] = useState(false)

  const avatarCaption =
    user?.first_name
      .charAt(0)
      .toUpperCase()
      .concat(user.last_name.charAt(0).toUpperCase()) ?? "BC"

  const updateSettings = useCallback(
    (user: User) =>
      Promise.resolve(update(user)).then(() => setOpenedSuccessDialog(false)),
    [update],
  )

  return (
    <Fragment>
      <Container maxWidth="sm">
        <Paper className={classes.paper} variant="elevation">
          {user && (
            <AccountSettingsForm
              avatar={avatarCaption}
              user={user}
              onSubmit={updateSettings}
            />
          )}
        </Paper>
      </Container>
      <SuccessDialog
        title="Данные успешно сохранены"
        isOpened={openedSuccessDialog}
        onClose={() => setOpenedSuccessDialog(false)}
      />
    </Fragment>
  )
})

type AccountSettingsFormProps = {
  avatar: string
  user: User
  onSubmit: (user: User) => Promise<void>
}

const AccountSettingsForm = memo((props: AccountSettingsFormProps) => {
  const { avatar, user, onSubmit } = props
  const classes = useStyles()

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik<User>({
    enableReinitialize: true,
    initialValues: {
      ...user,
    },
    initialTouched: {
      first_name: false,
      last_name: false,
      email: false,
      phone: false,
      job: false,
    },
    validationSchema: UserEditSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await onSubmit(values)
      setSubmitting(false)
    },
  })

  return (
    <form onSubmit={handleSubmit} className={classes.root} noValidate={true}>
      <Grid container={true} spacing={3}>
        <Grid item={true}>
          <Avatar className={classes.avatar}>{avatar}</Avatar>
        </Grid>
        <Grid item={true} xs={12} sm>
          <TextField
            label="Имя"
            id="first_name"
            name="first_name"
            value={values.first_name}
            error={"first_name" in errors && touched.first_name}
            helperText={touched.first_name ? errors.first_name : undefined}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            label="Фамилия"
            id="last_name"
            name="last_name"
            value={values.last_name}
            error={"last_name" in errors && touched.last_name}
            helperText={touched.last_name ? errors.last_name : undefined}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            label="Должность"
            id="job"
            name="job"
            value={values.job ?? ""}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            label="Телефон"
            id="phone"
            name="phone"
            type="tel"
            value={values.phone ?? ""}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            label="Email"
            id="email"
            name="email"
            type="email"
            value={values.email}
            error={"email" in errors && touched.email}
            helperText={touched.email ? errors.email : undefined}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <Grid container={true} justify="flex-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
            >
              Сохранить
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
})

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
    backgroundColor: indigo[500],
  },
}))
