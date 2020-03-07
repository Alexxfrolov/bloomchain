import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
  RefObject,
  FormEvent,
  SyntheticEvent,
  ChangeEvent,
} from "react"
import {
  Container,
  Paper,
  Grid,
  TextField,
  InputLabel,
  Typography,
  Select,
  FormControl,
  MenuItem,
  Button,
  makeStyles,
  createStyles,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { Editor } from "@lib/editor"
import { articlesApi, Article } from "@api/articles"
import { tagsApi, Tag } from "@api/tags"
import { mediaApi } from "@api/media"
import { ErrorDialog } from "@features/core"
import { ArticleCover } from "@features/articles"

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(4),
      textAlign: "left",
      color: theme.palette.text.secondary,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
  }),
)

const INITIAL_ARTICLE: Omit<
  Article,
  "created_at" | "updated_at" | "id" | "keywords" | "cover"
> & {
  cover_id: number | null
  keywords: string | null
} = {
  author: null,
  body: null,
  cover_id: null,
  published_at: null,
  description: null,
  keywords: null,
  lead: null,
  status: "draft",
  tags: [],
  time: null,
  title: "",
  type: "newsfeed",
}

export const ActicleCreatePage = () => {
  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const response = await tagsApi.get()
        setTags(response.data.data)
      } catch {
        setError(true)
      }

      setLoading(false)
    }
    fetchData()
  }, [])

  const [openedSuccessDialog, setOpenedSuccessDialog] = useState(false)
  const [openedErrorDialog, setOpenedErrorDialog] = useState(false)

  const inputTypeLabel: RefObject<HTMLLabelElement> | null = useRef(null)
  const inputStatusLabel: RefObject<HTMLLabelElement> | null = useRef(null)

  const [typeLabelWidth, setTypeLabelWidth] = useState(0)
  const [statusLabelWidth, setStatusLabelWidth] = useState(0)

  const [cover, setCover] = useState<ArticleCover>({
    file: null,
    alt: null,
    title: null,
    source: null,
    type: "image",
  })

  useEffect(() => {
    if (inputTypeLabel.current) {
      setTypeLabelWidth(inputTypeLabel.current.offsetWidth)
    }
    if (inputStatusLabel.current) {
      setStatusLabelWidth(inputStatusLabel.current.offsetWidth)
    }
  }, [])

  const fileInputRef: RefObject<HTMLInputElement> | null = useRef(null)
  const imageRef: RefObject<HTMLImageElement> | null = useRef(null)

  const [article, setArticle] = useState({ ...INITIAL_ARTICLE })

  const handleChangeFormField = useCallback(
    (field: string) => (event: SyntheticEvent<{ value: string }>) => {
      setArticle({ ...article, ...{ [field]: event.currentTarget.value } })
    },
    [article, setArticle],
  )

  const handleChangeCoverField = useCallback(
    (field: string) => (event: SyntheticEvent<{ value: string }>) => {
      setCover({ ...cover, [field]: event.currentTarget.value })
    },
    [cover, setCover],
  )

  const handleChangeEditor = useCallback(
    (value: string) => {
      setArticle({ ...article, ...{ body: value } })
    },
    [article, setArticle],
  )

  const handleDateChange = useCallback(
    (date: Date | null) => {
      setArticle({
        ...article,
        published_at: date,
      })
    },
    [article, setArticle],
  )

  const handleChangeImageFileInput = useCallback(() => {
    if (
      fileInputRef.current &&
      fileInputRef.current.files !== null &&
      fileInputRef.current.files.length === 1
    ) {
      const reader = new FileReader()

      reader.onload = function(event: ProgressEvent<FileReader>) {
        if (imageRef.current) {
          event?.target?.result &&
            typeof event.target.result === "string" &&
            imageRef.current.setAttribute("src", event.target.result)
        }
      }

      reader.readAsDataURL(fileInputRef.current.files[0])

      setCover({ ...cover, ...{ file: fileInputRef.current.files[0] } })
    }
  }, [cover, setCover])

  const handleChangeSelect = useCallback(
    (name: keyof Pick<Article, "type" | "status">) => (
      event: ChangeEvent<{ value: unknown }>,
    ) => {
      setArticle({
        ...article,
        [name]: event.target.value,
      })
    },
    [article, setArticle],
  )

  const handleChangeTagsSelect = useCallback(
    (event: React.ChangeEvent<{}>, tags: Tag[]) => {
      setArticle({
        ...article,
        tags,
      })
    },
    [article, setArticle],
  )

  const handleClearButtonClick = useCallback(() => {
    setArticle({
      ...INITIAL_ARTICLE,
    })
    setCover({
      file: null,
      alt: "",
      title: "",
      source: "",
      type: "image",
    })
  }, [setCover, setArticle])

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()

      try {
        if (cover.file) {
          const mediaResponse = await mediaApi.create(cover)
          await articlesApi.create({
            ...article,
            cover_id: mediaResponse.data.id,
          })

          setArticle({
            ...INITIAL_ARTICLE,
          })
          setCover({
            file: null,
            alt: "",
            title: "",
            source: "",
            type: "image",
          })
          setOpenedSuccessDialog(true)
        }

        await articlesApi.create(article)

        setArticle({
          ...INITIAL_ARTICLE,
        })
        setCover({
          file: null,
          alt: "",
          title: "",
          source: "",
          type: "image",
        })
        setOpenedSuccessDialog(true)
      } catch {
        setError(true)
        setOpenedErrorDialog(true)
      }
    },
    [cover, article, setOpenedSuccessDialog, setError, setOpenedErrorDialog],
  )

  const tagsOptions = useMemo(
    () =>
      tags.reduce((acc: Tag[], tag) => {
        const selected = article.tags.some(
          (articleTag) => articleTag.id === tag.id,
        )
        if (!selected) {
          return [...acc, tag]
        }

        return [...acc]
      }, []),
    [article.tags, tags],
  )

  return (
    <Fragment>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container={true} spacing={3}>
          <Grid item={true} xs={12}>
            <Typography component="h1" variant="h4" gutterBottom={false}>
              Создать
            </Typography>
          </Grid>
          <Grid item={true} xs={12}>
            <Paper className={classes.paper}>
              <form onSubmit={handleSubmit}>
                <Grid container={true} spacing={6} alignItems="flex-start">
                  <Grid item={true} xs={9} container={true} spacing={4}>
                    <Grid item={true} xs={12}>
                      <FormControl variant="outlined" fullWidth={true}>
                        <InputLabel ref={inputTypeLabel} id="type">
                          Раздел
                        </InputLabel>
                        <Select
                          labelId="type"
                          id="type"
                          labelWidth={typeLabelWidth}
                          value={article.type}
                          onChange={handleChangeSelect("type")}
                        >
                          <MenuItem value="newsfeed">Коротко</MenuItem>
                          <MenuItem value="detailed">В Деталях</MenuItem>
                          <MenuItem value="analysis">
                            Биржевая аналитика
                          </MenuItem>
                          <MenuItem value="in_russia">Что в России</MenuItem>
                          <MenuItem value="calendar">События</MenuItem>
                          <MenuItem value="person">Персона</MenuItem>
                          <MenuItem value="research">Исследования</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item={true} xs={12}>
                      <TextField
                        id="title"
                        fullWidth={true}
                        label="Заголовок"
                        value={article.title}
                        variant="outlined"
                        onChange={handleChangeFormField("title")}
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <TextField
                        id="lead"
                        fullWidth={true}
                        label="Лид"
                        value={article.lead ?? ""}
                        variant="outlined"
                        onChange={handleChangeFormField("lead")}
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <TextField
                        id="author"
                        fullWidth={true}
                        label="Автор"
                        value={article.author ?? ""}
                        variant="outlined"
                        onChange={handleChangeFormField("author")}
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <Autocomplete<Tag>
                        id="tags"
                        multiple={true}
                        options={tagsOptions}
                        noOptionsText="Пусто"
                        value={article.tags}
                        disableCloseOnSelect={true}
                        getOptionLabel={(option) => option.name}
                        onChange={handleChangeTagsSelect}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Тэги"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <Editor
                        value={article.body ?? ""}
                        onChange={handleChangeEditor}
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <Typography
                        color="textPrimary"
                        variant="h6"
                        component="h6"
                        gutterBottom={false}
                      >
                        Мета информация
                      </Typography>
                    </Grid>
                    <Grid item={true} xs={12}>
                      <TextField
                        id="keywords"
                        label="Keywords"
                        value={article.keywords ?? ""}
                        fullWidth={true}
                        variant="outlined"
                        onChange={handleChangeFormField("keywords")}
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <TextField
                        id="description"
                        label="Description"
                        value={article.description ?? ""}
                        fullWidth={true}
                        variant="outlined"
                        onChange={handleChangeFormField("description")}
                      />
                    </Grid>
                  </Grid>
                  <Grid item={true} sm container={true} spacing={4}>
                    <Grid item={true} xs={12}>
                      <Typography
                        color="textPrimary"
                        variant="h6"
                        component="h6"
                        gutterBottom={true}
                      >
                        Титульное изображение
                      </Typography>
                      {cover.file !== null && (
                        <img width="100%" ref={imageRef} />
                      )}
                      <input
                        accept="image/*"
                        id="cover"
                        ref={fileInputRef}
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleChangeImageFileInput}
                      />
                      <label htmlFor="cover">
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                        >
                          Загрузить
                        </Button>
                      </label>
                    </Grid>
                    {cover.file !== null && (
                      <Grid item={true} xs={12} container={true} spacing={1}>
                        <Grid item={true} xs={12}>
                          <TextField
                            id="title"
                            label="Заголовок"
                            value={cover.title ?? ""}
                            fullWidth={true}
                            variant="outlined"
                            size="small"
                            onChange={handleChangeCoverField("title")}
                          />
                        </Grid>
                        <Grid item={true} xs={12}>
                          <TextField
                            id="alt"
                            label="Атрибут alt"
                            value={cover.alt ?? ""}
                            fullWidth={true}
                            variant="outlined"
                            size="small"
                            onChange={handleChangeCoverField("alt")}
                          />
                        </Grid>
                        <Grid item={true} xs={12}>
                          <TextField
                            id="source"
                            label="Подпись"
                            value={cover.source ?? ""}
                            fullWidth={true}
                            variant="outlined"
                            size="small"
                            onChange={handleChangeCoverField("source")}
                          />
                        </Grid>
                      </Grid>
                    )}
                    <Grid item={true} xs={12}>
                      <FormControl variant="outlined" fullWidth={true}>
                        <InputLabel ref={inputStatusLabel} id="type">
                          Статус
                        </InputLabel>
                        <Select
                          labelId="status"
                          id="status"
                          labelWidth={statusLabelWidth}
                          value={article.status}
                          onChange={handleChangeSelect("status")}
                        >
                          <MenuItem value="draft">Черновик</MenuItem>
                          <MenuItem value="archive">
                            Готово к публикации
                          </MenuItem>
                          <MenuItem value="published">Опубликовано</MenuItem>
                          <MenuItem value="archive">Архив</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid item={true} xs={12}>
                        <KeyboardDatePicker
                          variant="dialog"
                          margin="normal"
                          id="published_at"
                          label="Дата публикации"
                          format="dd/MM/yyyy"
                          value={article.published_at}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "Выберите дату",
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid item={true} xs={12}>
                      <TextField
                        id="description"
                        label="Время прочтения"
                        type="number"
                        value={article.time ?? ""}
                        fullWidth={true}
                        variant="outlined"
                        autoComplete="off"
                        onChange={handleChangeFormField("time")}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item={true}
                    xs={12}
                    container={true}
                    justify="flex-end"
                    spacing={2}
                  >
                    <Grid item={true}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={handleClearButtonClick}
                      >
                        Очистить поля
                      </Button>
                    </Grid>
                    <Grid item={true}>
                      <Button variant="contained" color="primary" type="submit">
                        Сохранить
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
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
