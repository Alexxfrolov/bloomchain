import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  SyntheticEvent,
  FormEvent,
  RefObject,
} from "react"
import { useRouter } from 'react-router5'
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
import { usersAPI, User } from "@api/user"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}))

export const UserCreatePage = () => {
  const router = useRouter()
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
    name: "",
    email: "",
    password: "",
    role: "writer",
  })

  const handleChangeField = useCallback(
    (field: keyof User) => (event: SyntheticEvent<{ value: string }>) => {
      setUser({ ...user, ...{ [field]: event.target.value } })
    },
    [user, setUser],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      const response = await usersAPI.create(user)

      if (response.status === 201) {
        router.navigate('admin.management.users')
      }
    },
    [user],
  )

  return (
    <Container maxWidth="md">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <Typography component="h1" variant="h4" gutterBottom={false}>
            Новый пользователь
          </Typography>
        </Grid>
        <Grid item={true} xs={12}>
          <Paper className={classes.paper} variant="elevation">
            <form onSubmit={handleSubmit}>
              <Grid item={true} xs={12} container={true} spacing={4}>
                <Grid item={true} xs={12}>
                  <TextField
                    id="name"
                    fullWidth={true}
                    label="Имя"
                    value={user.name}
                    variant="outlined"
                    onChange={handleChangeField("name")}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <TextField
                    id="email"
                    type="email"
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
                      <MenuItem value="writer">Автор</MenuItem>
                      <MenuItem value="admin">Админ</MenuItem>
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
