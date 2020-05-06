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

const INITIAL_ARTICLE: Omit<Article, "id"> = {
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
  const { authors, initialArticle = INITIAL_ARTICLE, tags, onSubmit } = props
  const classes = useStyles()

  const [article, setArticle] = useState<Omit<Article, "id">>({
    ...initialArticle,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [didSubmitted, setSubmitted] = useState(false)

  const inputTypeLabel: RefObject<HTMLLabelElement> = useRef(null)
  const inputStatusLabel: RefObject<HTMLLabelElement> = useRef(null)

  const [typeLabelWidth, setTypeLabelWidth] = useState(0)
  const [statusLabelWidth, setStatusLabelWidth] = useState(0)

  useEffect(() => {
    setTypeLabelWidth(inputTypeLabel.current?.offsetWidth ?? 0)
    setStatusLabelWidth(inputStatusLabel.current?.offsetWidth ?? 0)
  }, [inputTypeLabel, inputStatusLabel])

  useEffect(() => {
    if (didSubmitted) {
      const { errors: fieldsErrors } = validateFormFields(article)
      setErrors(fieldsErrors)
    }
  }, [didSubmitted, article])

  const handleChangeFormField = useCallback(
    (field: string) => (event: SyntheticEvent<{ value: string }>) => {
      setArticle({ ...article, ...{ [field]: event.currentTarget.value } })
    },
    [article, setArticle],
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

  const seoSettingsChangeHandler = useCallback(
    (field: keyof Article["seo_settings"]) => (
      event: SyntheticEvent<{ value: string }>,
    ) => {
      setArticle({
        ...article,
        seo_settings: {
          ...article.seo_settings,
          [field]: event.currentTarget.value,
        },
      })
    },
    [article, setArticle],
  )

  const handleUpload = useCallback(
    (image: MediaFile) => {
      setArticle({
        ...article,
        cover: image,
      })
    },
    [article, setArticle],
  )

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
    (_event: ChangeEvent<{}>, tags: Tag[]) => {
      setArticle({
        ...article,
        tags,
      })
    },
    [article, setArticle],
  )

  const handleChangeAuthorsSelect = useCallback(
    (_event: ChangeEvent<{}>, authors: Author[]) => {
      setArticle({
        ...article,
        authors,
      })
    },
    [article, setArticle],
  )

  const handleClearButtonClick = useCallback(() => {
    setArticle({
      ...INITIAL_ARTICLE,
    })
  }, [setArticle])

  const handleSubmitForm = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      setSubmitted(true)
      const { isValid } = validateFormFields(article)
      if (isValid) {
        onSubmit(article)
      }
    },
    [article, onSubmit],
  )

  const tagsOptions = useMemo(() => {
    if (article.tags.length) {
      return tags.reduce<Tag[]>((acc, tag) => {
        const isAuthorSelected = article.tags.find(
          (articleTag) => articleTag.id === tag.id,
        )
        if (isAuthorSelected) {
          return acc
        }

        return [...acc, tag]
      }, [])
    }
    return tags
  }, [article.tags, tags])

  const authorsOptions = useMemo(() => {
    if (article.authors.length) {
      return authors.reduce<Author[]>((acc, author) => {
        const isTagSelected = article.authors.find(
          (articleAuthor) => articleAuthor.id === author.id,
        )
        if (isTagSelected) {
          return acc
        }

        return [...acc, author]
      }, [])
    }
    return authors
  }, [article.authors, authors])

  const isEnabledDatePicker = useMemo(
    () => !["ready"].includes(article.status),
    [article.status],
  )

  const isDisabledForm = useMemo(() => !!Object.keys(errors).length, [errors])

  return (
    <form
      onSubmit={handleSubmitForm}
      className={classes.root}
      noValidate={true}
    >
      <Grid container={true} spacing={4}>
        <Grid item={true} md={12} lg={8}>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
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
              <MenuItem value="analysis">Биржевая аналитика</MenuItem>
              <MenuItem value="in-russia">Что в России</MenuItem>
              <MenuItem value="calendar">События</MenuItem>
              <MenuItem value="people">Персона</MenuItem>
              <MenuItem value="research">Исследования</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="title"
            label="Заголовок *"
            value={article.title}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChangeFormField("title")}
          />
          <TextField
            id="lead"
            label="Лид"
            value={article.lead ?? ""}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChangeFormField("lead")}
          />
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <Autocomplete<Author>
              id="authors"
              multiple={true}
              options={authorsOptions}
              noOptionsText="Пусто"
              value={article.authors}
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
              value={article.tags}
              disableCloseOnSelect={true}
              getOptionLabel={(option) => option.name}
              onChange={handleChangeTagsSelect}
              renderInput={(params) => (
                <TextField {...params} label="Тэги" variant="outlined" />
              )}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <Editor value={article.body ?? ""} onChange={handleChangeEditor} />
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
          {article.cover && (
            <FormControl margin="normal" fullWidth={true} variant="outlined">
              <img
                width="100%"
                src={article.cover.url}
                alt={article.cover.alt ?? ""}
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
              labelWidth={statusLabelWidth}
              value={article.status}
              onChange={handleChangeSelect("status")}
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
                value={article.published_at}
                onChange={handleDateChange}
              />
              <FormHelperText variant="filled">
                Доступно при статусе &laquo;Готово к публикации&raquo;
              </FormHelperText>
            </FormControl>
          </MuiPickersUtilsProvider>
          <TextField
            id="description"
            label="Время прочтения"
            type="number"
            value={article.time ?? ""}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            autoComplete="new-article-time"
            onChange={handleChangeFormField("time")}
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
              id="keywords"
              label="Keywords"
              value={article.seo_settings.keywords}
              fullWidth={true}
              variant="outlined"
              onChange={seoSettingsChangeHandler("keywords")}
            />
            <FormHelperText variant="filled">
              Разделяйте слова запятыми или пробелами. По умолчанию тэги статьи.
            </FormHelperText>
          </FormControl>
          <FormControl margin="dense" fullWidth={true}>
            <TextField
              id="description"
              label="Description"
              value={article.seo_settings.description ?? ""}
              inputProps={{ maxLength: 200 }}
              fullWidth={true}
              variant="outlined"
              onChange={seoSettingsChangeHandler("description")}
            />
            <FormHelperText variant="filled">
              Не более 200 символов. По умолчанию лид статьи.
            </FormHelperText>
          </FormControl>
          <FormControl margin="dense" fullWidth={true}>
            <TextField
              id="description"
              label="og:type"
              value={article.seo_settings.og_type}
              fullWidth={true}
              variant="outlined"
              onChange={seoSettingsChangeHandler("og_type")}
            />
            <FormHelperText variant="filled">
              По умолчанию article.
            </FormHelperText>
          </FormControl>
          <FormControl margin="dense" fullWidth={true}>
            <TextField
              id="description"
              label="og:title"
              value={article.seo_settings.og_title ?? ""}
              fullWidth={true}
              variant="outlined"
              onChange={seoSettingsChangeHandler("og_title")}
            />
            <FormHelperText variant="filled">
              По умолчанию заголовок статьи.
            </FormHelperText>
          </FormControl>
          <FormControl margin="dense" fullWidth={true}>
            <TextField
              id="description"
              label="og:description"
              value={article.seo_settings.og_description ?? ""}
              inputProps={{ maxLength: 200 }}
              fullWidth={true}
              variant="outlined"
              onChange={seoSettingsChangeHandler("og_description")}
            />
            <FormHelperText variant="filled">
              Не более 200 символов. По умолчанию лид статьи.
            </FormHelperText>
          </FormControl>
          <FormControl margin="dense" fullWidth={true}>
            <TextField
              id="description"
              label="og:image"
              value={article.seo_settings.og_image ?? ""}
              fullWidth={true}
              variant="outlined"
              onChange={seoSettingsChangeHandler("og_image")}
            />
            <FormHelperText variant="filled">
              По умолчанию превью статьи.
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
              onClick={handleClearButtonClick}
            >
              Очистить поля
            </Button>
          </Grid>
          <Grid item={true}>
            <Button
              type="submit"
              disabled={isDisabledForm}
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

function validateFormFields(fields: Article) {
  const errors: { [key: string]: string } = {}

  if (!fields.title.length) {
    errors["title"] = "Укажите заголовок"
  }

  return {
    isValid: !Object.keys(errors).length,
    errors,
  }
}
