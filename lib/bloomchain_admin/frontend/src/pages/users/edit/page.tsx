import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  SyntheticEvent,
  FormEvent,
  RefObject,
} from "react"
import { useRoute } from "react-router5"
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

export const UserEditPage = () => {
  const classes = useStyles()
  const { route } = useRoute()

  const [user, setUser] = useState<User>({
    id: null,
    name: "",
    email: "",
    password: "",
    role: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { id, role, name, email },
        } = await usersAPI.getById(route.params.id)
        setUser({
          id,
          name,
          email,
          role,
        })
        // setUsers(response.data.data)
      } catch {}
    }
    fetchData()
  }, [route.params.id])

  const selectRoleLabelRef: RefObject<HTMLLabelElement> | null = useRef(null)
  const [selectRoleLabelWidth, setSelectRoleLabelWidth] = useState(0)

  useEffect(() => {
    if (selectRoleLabelRef.current) {
      setSelectRoleLabelWidth(selectRoleLabelRef.current.offsetWidth)
    }
  }, [])

  const handleChangeField = useCallback(
    (field: keyof User) => (event: SyntheticEvent<{ value: string }>) => {
      setUser({ ...user, ...{ [field]: event.currentTarget.value } })
    },
    [user, setUser],
  )

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      usersAPI.update(user)
    },
    [user],
  )

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
                    autoComplete="no"
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
