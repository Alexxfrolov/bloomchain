import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  RefObject,
  FormEvent,
  SyntheticEvent,
  ChangeEvent,
} from "react"
import { useRoute } from "react-router5"
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
  Dialog,
  DialogTitle,
  DialogActions,
  makeStyles,
  createStyles,
} from "@material-ui/core"
import { Autocomplete, Skeleton } from "@material-ui/lab"
import { Editor } from "@lib/editor"
import { articlesApi, Article } from "@api/articles"
import { tagsApi, Tag } from "@api/tags"
import { mediaApi, UploadableMediaFile } from "@api/media"

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

export const ActicleEditPage = () => {
  const classes = useStyles()
  const { route } = useRoute()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [tags, setTags] = useState<Tag[]>([])
  const [article, setArticle] = useState<
    Omit<Article, "createdAt" | "updatedAt" | "keywords" | "id"> & {
      keywords: string | null
    }
  >({
    author: null,
    body: null,
    description: null,
    keywords: null,
    lead: null,
    time: null,
    status: "draft",
    tags: [],
    title: "",
    type: "newsfeed",
  })

  useEffect(() => {
    const fetchData = async () => {
      setError(false)

      try {
        const response = await tagsApi.get()
        setTags(response.data.data)
      } catch {
        setError(true)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const response = await articlesApi.getById(route.params.id)
        setArticle({
          ...article,
          ...response.data,
          keywords: response.data.keywords.length
            ? response.data.keywords.join(", ")
            : "",
        })
      } catch {
        setError(true)
      }

      setLoading(false)
    }
    fetchData()
  }, [route.params.id])

  const inputTypeLabel: RefObject<HTMLLabelElement> | null = useRef(null)
  const inputStatusLabel: RefObject<HTMLLabelElement> | null = useRef(null)
  const [typeLabelWidth, setTypeLabelWidth] = useState(0)
  const [statusLabelWidth, setStatusLabelWidth] = useState(0)

  const [openedDialog, setOpenedDialog] = useState(false)

  useEffect(() => {
    if (inputTypeLabel.current) {
      setTypeLabelWidth(inputTypeLabel.current.offsetWidth)
    }
    if (inputStatusLabel.current) {
      setStatusLabelWidth(inputStatusLabel.current.offsetWidth)
    }
  }, [])

  const fileInputRef: RefObject<HTMLInputElement> | null = useRef(null)

  const handleChangeFormField = useCallback(
    (field: string) => (event: SyntheticEvent<{ value: string }>) => {
      setArticle({ ...article, ...{ [field]: event.currentTarget.value } })
    },
    [article, setArticle],
  )

  const handleChangeCoverField = useCallback(
    async (event: SyntheticEvent<{ value: string; name: string }>) => {
      const { value, name } = event.currentTarget

      if (value) {
        const response = mediaApi.update({
          id: article.cover.id,
          [name]: value,
        })
      }
      // setArticle({
      //   ...article,
      //   cover: {
      //     ...article.cover,
      //     [name]: value,
      //   },
      // })
    },
    [article, setArticle],
  )

  const handleChangeEditor = useCallback(
    (value: string) => {
      setArticle({ ...article, ...{ body: value } })
    },
    [article, setArticle],
  )

  const handleChangeFileInputChange = useCallback(async () => {
    if (
      fileInputRef.current &&
      fileInputRef.current.files !== null &&
      fileInputRef.current.files.length === 1
    ) {
      const image: UploadableMediaFile = {
        file: fileInputRef.current.files[0],
        type: "image",
      }
      const response = await mediaApi.create(image)

      if (response.status === 201) {
        setArticle({
          ...article,
          cover: { ...response.data },
        })
      }
      // const reader = new FileReader()
      // reader.onload = function(event: ProgressEvent<FileReader>) {
      //   if (imageRef.current) {
      //     event?.target?.result?.[
      //       imageRef.current.setAttribute("src", event.target.result)
      //     ]
      //   }
      // }
      // reader.readAsDataURL(fileInputRef.current.files[0])
      // setArticle({ ...article, ...{ cover: fileInputRef.current.files[0] } })
    }
  }, [article, setArticle])

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

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()

      const response = await articlesApi.update(article)
      if (response.status === 200) {
        setOpenedDialog(true)
      }
    },
    [article, setOpenedDialog],
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
              Редактирование статьи
            </Typography>
          </Grid>
          <Grid item={true} xs={12}>
            <Paper className={classes.paper}>
              {loading ? (
                <Skeleton width="100%" height="900px" />
              ) : (
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
                          value={article.tags}
                          disableCloseOnSelect={true}
                          getOptionLabel={(option) => option.name}
                          onChange={handleChangeTagsSelect}
                          noOptionsText="Пусто"
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
                        {article.cover && (
                          <img width="100%" src={article.cover.link} />
                        )}
                        <input
                          accept="image/*"
                          id="cover"
                          ref={fileInputRef}
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleChangeFileInputChange}
                        />
                        <label htmlFor="cover">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                          >
                            Изменить
                          </Button>
                        </label>
                      </Grid>
                      {article.cover && (
                        <Grid item={true} xs={12} container={true} spacing={1}>
                          <Grid item={true} xs={12}>
                            <TextField
                              id="title"
                              name="title"
                              label="Заголовок"
                              defaultValue={article.cover?.title ?? ""}
                              fullWidth={true}
                              variant="outlined"
                              size="small"
                              onBlur={handleChangeCoverField}
                            />
                          </Grid>
                          <Grid item={true} xs={12}>
                            <TextField
                              id="alt"
                              name="alt"
                              label="Атрибут alt"
                              defaultValue={article.cover?.alt ?? ""}
                              fullWidth={true}
                              variant="outlined"
                              size="small"
                              onBlur={handleChangeCoverField}
                            />
                          </Grid>
                          <Grid item={true} xs={12}>
                            <TextField
                              id="source"
                              name="source"
                              label="Подпись"
                              defaultValue={article.cover?.source ?? ""}
                              fullWidth={true}
                              variant="outlined"
                              size="small"
                              onBlur={handleChangeCoverField}
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
                            <MenuItem value="published">Опубликовано</MenuItem>
                            <MenuItem value="archive">Архив</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item={true} xs={12}>
                        <TextField
                          id="description"
                          label="Время прочтения"
                          type="number"
                          value={article.time ?? ""}
                          fullWidth={true}
                          variant="outlined"
                          onChange={handleChangeFormField("time")}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item={true}
                      xs={12}
                      container={true}
                      justify="flex-end"
                    >
                      <Button variant="contained" color="primary" type="submit">
                        Обновить
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <SuccessDialog
        opened={openedDialog}
        onClose={() => setOpenedDialog(false)}
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
    <DialogTitle>Статья успешно обновлена</DialogTitle>
    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus>
        Закрыть
      </Button>
    </DialogActions>
  </Dialog>
)
