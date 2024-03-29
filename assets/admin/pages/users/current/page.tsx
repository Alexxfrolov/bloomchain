import React, { memo, Fragment, useState, useCallback } from "react"
import { useFormik } from "formik"
import { useSnackbar } from "notistack"
import {
  Container,
  Grid,
  Paper,
  TextField,
  Avatar,
  InputAdornment,
  IconButton,
  Button,
  makeStyles,
} from "@material-ui/core"
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded"
import VisibilityOffRoundedIcon from "@material-ui/icons/VisibilityOffRounded"
import { indigo } from "@material-ui/core/colors"
import { User } from "@api/user"
import { useCurrentUser } from "@features/core"
import { UserEditSchema } from "@features/users"

export function UserAccountPage() {
  const { user, update } = useCurrentUser()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const avatarCaption =
    user?.first_name
      .charAt(0)
      .toUpperCase()
      .concat(user.last_name.charAt(0).toUpperCase()) ?? "BC"

  const updateSettings = useCallback(
    (user: User) =>
      Promise.resolve(update(user)).then(() => {
        enqueueSnackbar("Данные успешно сохранены", {
          variant: "success",
        })
      }),
    [update, enqueueSnackbar],
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
    </Fragment>
  )
}

type AccountSettingsFormProps = {
  avatar: string
  user: User
  onSubmit: (user: User) => Promise<void>
}

const AccountSettingsForm = memo((props: AccountSettingsFormProps) => {
  const { avatar, user, onSubmit } = props
  const classes = useStyles()

  const [isPasswordVisible, setPasswordVisible] = useState(false)

  const handleClickShowPassword = () => {
    setPasswordVisible(!isPasswordVisible)
  }

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
      password: "",
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
          <TextField
            label="Пароль"
            id="password"
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            value={values.password}
            error={"password" in errors && touched.password}
            helperText={touched.password ? errors.password : undefined}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {isPasswordVisible ? (
                      <VisibilityRoundedIcon />
                    ) : (
                      <VisibilityOffRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
