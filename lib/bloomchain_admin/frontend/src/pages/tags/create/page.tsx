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
import { Tag } from "@api/tags"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}))

export const TagsCreatePage = () => {
  const classes = useStyles()

  const selectLabel: RefObject<HTMLLabelElement> | null = useRef(null)
  const [selectLabelWidth, setSelectLabelWidth] = useState(0)

  useEffect(() => {
    if (selectLabel.current) {
      setSelectLabelWidth(selectLabel.current.offsetWidth)
    }
  }, [])

  const [tag, setTag] = useState<Tag>({
    name: "",
    type: "",
  })

  const handleChangeField = useCallback(
    (field: keyof Tag) => (event: SyntheticEvent<{ value: string }>) => {
      setTag({ ...tag, ...{ [field]: event.currentTarget.value } })
    },
    [tag, setTag],
  )

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault()
  }, [])

  return (
    <Container maxWidth="md">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <Typography component="h1" variant="h4" gutterBottom={false}>
            Новый тэг
          </Typography>
        </Grid>
        <Grid item={true} xs={12}>
          <Paper className={classes.paper} variant="elevation">
            <form onSubmit={handleSubmit}>
              <Grid container={true} xs={12} spacing={2}>
                <Grid item={true} xs={12}>
                  <TextField
                    id="name"
                    fullWidth={true}
                    label="Наименование"
                    value={tag.name}
                    variant="outlined"
                    onChange={handleChangeField("name")}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <FormControl variant="outlined" fullWidth={true}>
                    <InputLabel ref={selectLabel} id="type">
                      Раздел
                    </InputLabel>
                    <Select
                      labelId="type"
                      id="type"
                      labelWidth={selectLabelWidth}
                      value={tag.type}
                      onChange={handleChangeField("type")}
                    >
                      <MenuItem value="newsfeed">Коротко</MenuItem>
                      <MenuItem value="people">Персона</MenuItem>
                      <MenuItem value="detailed">В деталях</MenuItem>
                      <MenuItem value="in-russia">В России</MenuItem>
                      <MenuItem value="calendar">Календарь</MenuItem>
                    </Select>
                  </FormControl>
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
