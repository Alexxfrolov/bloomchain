import React, {
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
} from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { Article } from "@api/articles"
import { Author } from "@api/authors"
import { mediaApi, UploadableMediaFile } from "@api/media"
import { Editor } from "@lib/editor"
import { Tag } from "@api/tags"

const INITIAL_ARTICLE: Article = {
  authors: [],
  body: null,
  cover: null,
  created_at: null,
  description: null,
  id: null,
  keywords: [],
  lead: null,
  published_at: null,
  status: "draft",
  tags: [],
  time: null,
  title: "",
  type: "newsfeed",
  updated_at: null,
}

type ArticleFormProps = {
  authors: Author[]
  initialArticle?: Article
  tags: Tag[]
  onSubmit: (article: Article) => void
}

export const ArticleForm = ({
  authors,
  initialArticle = INITIAL_ARTICLE,
  tags,
  onSubmit,
}: ArticleFormProps) => {
  const [article, setArticle] = useState<Article>({ ...initialArticle })
  const [image, setImage] = useState<
    Omit<UploadableMediaFile, "file"> & { file: File | null }
  >({
    type: "image",
    file: null,
    title: null,
    alt: null,
    source: null,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [submitted, setSubmitted] = useState(false)

  const inputTypeLabel: RefObject<HTMLLabelElement> | null = useRef(null)
  const inputStatusLabel: RefObject<HTMLLabelElement> | null = useRef(null)
  const fileInputRef: RefObject<HTMLInputElement> | null = useRef(null)
  const imageRef: RefObject<HTMLImageElement> | null = useRef(null)

  const [typeLabelWidth, setTypeLabelWidth] = useState(0)
  const [statusLabelWidth, setStatusLabelWidth] = useState(0)

  useEffect(() => {
    if (inputTypeLabel.current) {
      setTypeLabelWidth(inputTypeLabel.current.offsetWidth)
    }
    if (inputStatusLabel.current) {
      setStatusLabelWidth(inputStatusLabel.current.offsetWidth)
    }
  }, [])

  useEffect(() => {
    if (submitted) {
      const { errors: fieldsErrors } = validateFormFields(article)
      setErrors(fieldsErrors)
    }
  }, [submitted, article])

  const handleChangeFormField = useCallback(
    (field: string) => (event: SyntheticEvent<{ value: string }>) => {
      setArticle({ ...article, ...{ [field]: event.currentTarget.value } })
    },
    [article, setArticle],
  )

  const handleChangeCoverField = useCallback(
    (field: string) => (event: SyntheticEvent<{ value: string }>) => {
      setImage({
        ...image,
        [field]: event.currentTarget.value,
      })
    },
    [image, setImage],
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

      setImage({
        ...image,
        file: fileInputRef.current.files[0],
      })
    }
  }, [image, setImage])

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
    (event: ChangeEvent<{}>, tags: Tag[]) => {
      setArticle({
        ...article,
        tags,
      })
    },
    [article, setArticle],
  )

  const handleChangeAuthorsSelect = useCallback(
    (event: ChangeEvent<{}>, authors: Author[]) => {
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
    async (event: FormEvent) => {
      event.preventDefault()
      setSubmitted(true)
      const { isValid } = validateFormFields(article)
      if (isValid) {
        try {
          const response =
            image.file !== null ? await mediaApi.create(image) : undefined
          response
            ? onSubmit({ ...article, cover_id: response.data.id })
            : onSubmit(article)
        } catch {}
      }
    },
    [article, image, setSubmitted, onSubmit],
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

  const authorsOptions = useMemo(
    () =>
      authors.reduce((acc: Author[], author) => {
        const selected = article.authors.some(
          (articleAuthor) => articleAuthor.id === author.id,
        )
        if (!selected) {
          return [...acc, author]
        }

        return [...acc]
      }, []),
    [article.authors, authors],
  )

  const disabledForm = useMemo(() => !!Object.keys(errors).length, [errors])

  return (
    <form onSubmit={handleSubmitForm}>
      <Grid container={true} spacing={3} alignItems="flex-start">
        <Grid item={true} md={12} lg={9} container={true} spacing={4}>
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
                <MenuItem value="analysis">Биржевая аналитика</MenuItem>
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
              label="Заголовок *"
              value={article.title}
              error={!!errors.title}
              helperText={errors.title}
              variant="outlined"
              fullWidth={true}
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
                <TextField {...params} label="Тэги" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item={true} xs={12}>
            <Editor value={article.body ?? ""} onChange={handleChangeEditor} />
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
            <FormHelperText variant="filled">
              Разделяйте слова запятыми или пробелами
            </FormHelperText>
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
        <Grid item={true} md={12} lg={3} container={true} spacing={4}>
          <Grid item={true} xs={12}>
            <Typography
              color="textPrimary"
              variant="h6"
              component="h6"
              gutterBottom={true}
            >
              Титульное изображение
            </Typography>
            {image.file || article.cover ? (
              <img width="100%" ref={imageRef} />
            ) : null}
            <input
              accept="image/*"
              id="cover"
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={handleChangeImageFileInput}
            />
            <label htmlFor="cover">
              <Button variant="contained" color="primary" component="span">
                Загрузить
              </Button>
            </label>
          </Grid>
          {image.file || article.cover ? (
            <Grid item={true} xs={12} container={true} spacing={2}>
              <Grid item={true} xs={12}>
                <TextField
                  id="title"
                  label="Заголовок"
                  value={image?.title ?? ""}
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
                  value={image?.alt ?? ""}
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
                  value={image?.source ?? ""}
                  fullWidth={true}
                  variant="outlined"
                  size="small"
                  onChange={handleChangeCoverField("source")}
                />
              </Grid>
            </Grid>
          ) : null}
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
                <MenuItem value="archive">Готово к публикации</MenuItem>
                <MenuItem value="published">Опубликовано</MenuItem>
                <MenuItem value="archive">Архив</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item={true} xs={12}>
              <DatePicker
                id="published_at"
                variant="dialog"
                margin="none"
                fullWidth={true}
                disabled={article.status !== "published"}
                inputVariant="outlined"
                label="Дата публикации"
                format="dd/MM/yyyy"
                // maxDate={}
                minDate={new Date()}
                value={article.published_at}
                onChange={handleDateChange}
              />
              <FormHelperText variant="filled">
                Доступно при статусе Опубликовано
              </FormHelperText>
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
            <Button
              type="submit"
              disabled={disabledForm}
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
}

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
