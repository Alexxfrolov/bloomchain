import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  SyntheticEvent,
  FormEvent,
  RefObject,
} from "react"
import {
  Grid,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core"
import { User } from "@api/user"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}))

export const UserEditPage = () => {
  const classes = useStyles()

  const selectRoleLabelRef: RefObject<HTMLLabelElement> | null = useRef(null)
  const selectStatusLabelRef: RefObject<HTMLLabelElement> | null = useRef(null)
  const [selectRoleLabelWidth, setSelectRoleLabelWidth] = useState(0)
  const [selectStatusLabelWidth, setSelectStatusLabelWidth] = useState(0)

  useEffect(() => {
    if (selectRoleLabelRef.current) {
      setSelectRoleLabelWidth(selectRoleLabelRef.current.offsetWidth)
    }
    if (selectStatusLabelRef.current) {
      setSelectStatusLabelWidth(selectStatusLabelRef.current.offsetWidth)
    }
  }, [])

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "editor",
    status: "active",
  })

  const handleChangeField = useCallback(
    (field: keyof User) => (event: SyntheticEvent<{ value: string }>) => {
      setUser({ ...user, ...{ [field]: event.currentTarget.value } })
    },
    [user, setUser],
  )

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault()
  }, [])

  return (
    <Container maxWidth="md">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <Typography component="h1" variant="h4" gutterBottom={false}>
            Редактирование пользователя
          </Typography>
        </Grid>
        <Grid item={true} xs={12}>
          <Paper className={classes.paper} variant="elevation">
            <form onSubmit={handleSubmit}>
              <Grid item={true} xs={12} container={true} spacing={4}>
                <Grid item={true} xs={12}>
                  <TextField
                    id="email"
                    fullWidth={true}
                    label="E-mail"
                    value={user.email}
                    variant="outlined"
                    onChange={handleChangeField("email")}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <FormControl variant="outlined" fullWidth={true}>
                    <InputLabel ref={selectRoleLabelRef} id="role">
                      Роль
                    </InputLabel>
                    <Select
                      labelId="role"
                      id="role"
                      labelWidth={selectRoleLabelWidth}
                      value={user.role}
                      onChange={handleChangeField("role")}
                    >
                      <MenuItem value="editor">Редактор</MenuItem>
                      <MenuItem value="writer">Автор</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item={true} xs={12}>
                  <FormControl variant="outlined" fullWidth={true}>
                    <InputLabel ref={selectStatusLabelRef} id="status">
                      Статус
                    </InputLabel>
                    <Select
                      labelId="status"
                      id="status"
                      labelWidth={selectStatusLabelWidth}
                      value={user.status}
                      onChange={handleChangeField("status")}
                    >
                      <MenuItem value="active">Активный</MenuItem>
                      <MenuItem value="inactive">Неактивный</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item={true} xs={12}>
                  <TextField
                    id="password"
                    type="password"
                    fullWidth={true}
                    label="Пароль"
                    value={user.password}
                    variant="outlined"
                    onChange={handleChangeField("password")}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <TextField
                    id="passwordConfirmation"
                    type="password"
                    fullWidth={true}
                    label="Подтверждение пароля"
                    value={user.passwordConfirmation}
                    variant="outlined"
                    onChange={handleChangeField("passwordConfirmation")}
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
