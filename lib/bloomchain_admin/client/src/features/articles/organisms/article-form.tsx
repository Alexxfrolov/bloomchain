import React, {
  memo,
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
  Grid,
  TextField,
  InputLabel,
  Typography,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  Button,
  makeStyles,
  createStyles,
} from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { ru } from "date-fns/locale"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { useFormik } from "formik"
import { Editor } from "@lib/editor"
import { Article } from "@api/articles"
import { Author } from "@api/authors"
import { MediaFile } from "@api/media"
import { Tag } from "@api/tags"
import { MediaUploadForm } from "@features/media"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "block",
      flexGrow: 1,
    },
  }),
)

const articlePreset: Omit<Article, "id"> = {
  authors: [],
  body: null,
  cover: null,
  inserted_at: null,
  lead: null,
  published_at: null,
  status: "draft",
  tags: [],
  seo_settings: {
    description: "",
    keywords: [],
    og_type: "article",
    og_title: "",
    og_description: "",
    og_image: "",
  },
  time: null,
  title: "",
  type: "newsfeed",
  updated_at: null,
}

type ArticleFormProps = {
  authors: Author[]
  initialArticle?: Omit<Article, "id">
  tags: Tag[]
  onSubmit: (article: Article) => void
}

// TODO: add removeObjectURL
export const ArticleForm = memo(function ArticleForm(props: ArticleFormProps) {
  const { authors, initialArticle = articlePreset, tags, onSubmit } = props
  const classes = useStyles()

  // const [article, setArticle] = useState<Omit<Article, "id">>({
  //   ...initialArticle,
  // })

  const inputTypeLabel: RefObject<HTMLLabelElement> = useRef(null)
  const inputStatusLabel: RefObject<HTMLLabelElement> = useRef(null)

  const [typeLabelWidth, setTypeLabelWidth] = useState(0)
  const [statusLabelWidth, setStatusLabelWidth] = useState(0)

  useEffect(() => {
    setTypeLabelWidth(inputTypeLabel.current?.offsetWidth ?? 0)
    setStatusLabelWidth(inputStatusLabel.current?.offsetWidth ?? 0)
  }, [inputTypeLabel, inputStatusLabel])

  // const handleChangeFormField = useCallback(
  //   (field: string) => (event: SyntheticEvent<{ value: string }>) => {
  //     setArticle({ ...article, ...{ [field]: event.currentTarget.value } })
  //   },
  //   [article, setArticle],
  // )

  // const seoSettingsChangeHandler = useCallback(
  //   (field: keyof Article["seo_settings"]) => (
  //     event: SyntheticEvent<{ value: string }>,
  //   ) => {
  //     setArticle({
  //       ...article,
  //       seo_settings: {
  //         ...article.seo_settings,
  //         [field]: event.currentTarget.value,
  //       },
  //     })
  //   },
  //   [article, setArticle],
  // )

  // const handleChangeSelect = useCallback(
  //   (name: keyof Pick<Article, "type" | "status">) => (
  //     event: ChangeEvent<{ value: unknown }>,
  //   ) => {
  //     setArticle({
  //       ...article,
  //       [name]: event.target.value,
  //     })
  //   },
  //   [article, setArticle],
  // )

  // const handleClearButtonClick = useCallback(() => {
  //   setArticle({
  //     ...articlePreset,
  //   })
  // }, [setArticle])

  // const handleSubmitForm = useCallback(
  //   (event: FormEvent) => {
  //     event.preventDefault()
  //     onSubmit(article)
  //     // const { body, ...rest } = article
  //     // const [_item, _groups, index] = body?.match('data-f-id="pbf"')
  //     // onSubmit({ ...rest, body: body.slice(0, Number(index) - 3) })
  //   },
  //   [article, onSubmit],
  // )

  const tagsOptions = useMemo(() => {
    if (initialArticle.tags.length) {
      return tags.reduce<Tag[]>((acc, tag) => {
        const isAuthorSelected = initialArticle.tags.find(
          (articleTag) => articleTag.id === tag.id,
        )
        if (isAuthorSelected) {
          return acc
        }

        return [...acc, tag]
      }, [])
    }
    return tags
  }, [initialArticle.tags, tags])

  const authorsOptions = useMemo(() => {
    if (initialArticle.authors.length) {
      return authors.reduce<Author[]>((acc, author) => {
        const isTagSelected = initialArticle.authors.find(
          (articleAuthor) => articleAuthor.id === author.id,
        )
        if (isTagSelected) {
          return acc
        }

        return [...acc, author]
      }, [])
    }
    return authors
  }, [initialArticle.authors, authors])

  const {
    values,
    errors,
    isSubmitting,
    isValid,
    handleSubmit,
    handleChange,
    handleReset,
    setFieldValue,
  } = useFormik({
    initialValues: {
      ...initialArticle,
    },
    onSubmit: (values, actions) => {
      console.log(values)
    },
    onReset: (values) => {
      console.log(values)
    },
  })

  const isEnabledDatePicker = useMemo(
    () => !["ready"].includes(values.status),
    [values.status],
  )

  const handleChangeEditor = useCallback(
    (value: string) => {
      setFieldValue("body", value)
    },
    [setFieldValue],
  )

  const handleDateChange = useCallback(
    (date: Date | null) => {
      setFieldValue("published_at", date)
    },
    [setFieldValue],
  )

  const handleChangeTagsSelect = useCallback(
    (_event: ChangeEvent<{}>, tags: Tag[]) => {
      setFieldValue("tags", tags)
    },
    [setFieldValue],
  )

  const handleChangeAuthorsSelect = useCallback(
    (_event: ChangeEvent<{}>, authors: Author[]) => {
      setFieldValue("authors", authors)
    },
    [setFieldValue],
  )

  const handleUpload = useCallback(
    (image: MediaFile) => {
      setFieldValue("cover", image)
    },
    [setFieldValue],
  )

  console.log({ values, errors })

  return (
    <form onSubmit={handleSubmit} className={classes.root} noValidate={true}>
      <Grid container={true} spacing={4}>
        <Grid item={true} md={12} lg={8}>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <InputLabel ref={inputTypeLabel} id="type">
              Раздел
            </InputLabel>
            <Select
              labelId="type"
              id="type"
              name="name"
              labelWidth={typeLabelWidth}
              value={values.type}
              onChange={handleChange}
            >
              <MenuItem value="newsfeed">Коротко</MenuItem>
              <MenuItem value="detailed">В Деталях</MenuItem>
              <MenuItem value="analysis">Биржевая аналитика</MenuItem>
              <MenuItem value="in-russia">Что в России</MenuItem>
              <MenuItem value="calendar">События</MenuItem>
              <MenuItem value="people">Персона</MenuItem>
              <MenuItem value="research">Исследования</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="title"
            name="title"
            label="Заголовок *"
            value={values.title}
            // error={!!errors.title}
            // helperText={errors.title}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            id="lead"
            name="lead"
            label="Лид"
            value={values.lead ?? ""}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
          />
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <Autocomplete<Author>
              id="authors"
              multiple={true}
              options={authorsOptions}
              noOptionsText="Пусто"
              value={values.authors}
              disableCloseOnSelect={true}
              getOptionLabel={(option) => option.name}
              onChange={handleChangeAuthorsSelect}
              renderInput={(params) => (
                <TextField {...params} label="Авторы" variant="outlined" />
              )}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <Autocomplete<Tag>
              id="tags"
              multiple={true}
              options={tagsOptions}
              noOptionsText="Пусто"
              value={values.tags}
              disableCloseOnSelect={true}
              getOptionLabel={(option) => option.name}
              onChange={handleChangeTagsSelect}
              renderInput={(params) => (
                <TextField {...params} label="Тэги" variant="outlined" />
              )}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <Editor value={values.body ?? ""} onChange={handleChangeEditor} />
          </FormControl>
        </Grid>
        <Grid item={true} md={12} lg={4}>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <Typography
              color="textPrimary"
              variant="h6"
              component="h6"
              gutterBottom={true}
            >
              Титульное изображение
            </Typography>
          </FormControl>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <MediaUploadForm onUpload={handleUpload} />
          </FormControl>
          {values.cover && (
            <FormControl margin="normal" fullWidth={true} variant="outlined">
              <img
                width="100%"
                src={values.cover.url}
                alt={values.cover.alt ?? ""}
              />
            </FormControl>
          )}
          <FormControl margin="normal" variant="outlined" fullWidth={true}>
            <InputLabel ref={inputStatusLabel} id="type">
              Статус
            </InputLabel>
            <Select
              labelId="status"
              id="status"
              name="status"
              labelWidth={statusLabelWidth}
              value={values.status}
              onChange={handleChange}
            >
              <MenuItem value="draft">Черновик</MenuItem>
              <MenuItem value="ready">Готово к публикации</MenuItem>
              <MenuItem value="published">Опубликовано</MenuItem>
              <MenuItem value="archive">Архив</MenuItem>
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
            <FormControl margin="normal" fullWidth={true} variant="outlined">
              <DateTimePicker
                id="published_at"
                variant="dialog"
                ampm={false}
                margin="none"
                fullWidth={true}
                disabled={isEnabledDatePicker}
                inputVariant="outlined"
                label="Дата публикации"
                format="dd/MM/yyyy HH:mm"
                value={values.published_at}
                onChange={handleDateChange}
              />
              <FormHelperText variant="filled">
                Доступно при статусе &laquo;Готово к публикации&raquo;
              </FormHelperText>
            </FormControl>
          </MuiPickersUtilsProvider>
          <TextField
            id="time"
            name="time"
            label="Время прочтения"
            type="number"
            value={values.time ?? ""}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            autoComplete="new-article-time"
            onChange={handleChange}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <FormControl margin="dense" fullWidth={true} variant="outlined">
            <Typography color="textPrimary" variant="h6" component="h6">
              SEO настройки
            </Typography>
          </FormControl>
          <FormControl margin="dense" fullWidth={true}>
            <TextField
              id="seo_settings.keywords"
              name="seo_settings.keywords"
              label="Keywords"
              value={values.seo_settings.keywords}
              fullWidth={true}
              variant="outlined"
              onChange={handleChange}
            />
            <FormHelperText variant="filled">
              Разделяйте слова запятыми или пробелами. По умолчанию тэги статьи.
            </FormHelperText>
          </FormControl>
          <FormControl margin="dense" fullWidth={true}>
            <TextField
              id="seo_settings.description"
              name="seo_settings.description"
              label="Description"
              value={values.seo_settings.description ?? ""}
              inputProps={{ maxLength: 200 }}
              fullWidth={true}
              variant="outlined"
              onChange={handleChange}
            />
            <FormHelperText variant="filled">
              Не более 200 символов. По умолчанию лид статьи.
            </FormHelperText>
          </FormControl>
          <FormControl margin="dense" fullWidth={true}>
            <TextField
              id="seo_settings.og_type"
              name="seo_settings.og_type"
              label="og:type"
              value={values.seo_settings.og_type}
              fullWidth={true}
              variant="outlined"
              onChange={handleChange}
            />
            <FormHelperText variant="filled">
              По умолчанию article
            </FormHelperText>
          </FormControl>
          <FormControl margin="dense" fullWidth={true}>
            <TextField
              id="seo_settings.og_title"
              name="seo_settings.og_title"
              label="og:title"
              value={values.seo_settings.og_title ?? ""}
              fullWidth={true}
              variant="outlined"
              onChange={handleChange}
            />
            <FormHelperText variant="filled">
              По умолчанию заголовок статьи.
            </FormHelperText>
          </FormControl>
          <FormControl margin="dense" fullWidth={true}>
            <TextField
              id="seo_settings.og_description"
              name="seo_settings.og_description"
              label="og:description"
              value={values.seo_settings.og_description ?? ""}
              inputProps={{ maxLength: 200 }}
              fullWidth={true}
              variant="outlined"
              onChange={handleChange}
            />
            <FormHelperText variant="filled">
              Не более 200 символов. По умолчанию лид статьи.
            </FormHelperText>
          </FormControl>
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
              onClick={handleReset}
            >
              Очистить поля
            </Button>
          </Grid>
          <Grid item={true}>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
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
