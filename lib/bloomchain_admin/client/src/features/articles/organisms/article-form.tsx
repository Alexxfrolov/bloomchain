import React, { memo, useMemo, useCallback, ChangeEvent } from "react"
import {
  Grid,
  TextField,
  Typography,
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
import { array, object, string, number } from "yup"
import { useFormik } from "formik"
import { Editor } from "@lib/editor"
import { Article } from "@api/articles"
import { Author } from "@api/authors"
import { MediaFile } from "@api/media"
import { Tag } from "@api/tags"
import { MediaUploadForm } from "@features/media"

import { article, ArticleStore } from "../model/article.store"
import {
  computedUnusedOptionsByInitialOptionsList,
  ARTICLE_STATUSES_RECORD,
  ARTICLE_TYPES_RECORD,
} from "../lib"

const ArticleStatusSchema = string().oneOf(["male", "female", "other"], "")
const ArticleTypeSchema = string().oneOf(["male", "female", "other"], "")

export const ArticleCreationSchema = object().shape({
  authors: array().of(string()).required("Авторы не заполнены"),
  body: string().required("Тело статьи не заполнено"),
  // cover: object()
  //   .shape({
  //     alt: string().required("Alt текст не может быть пустым"),
  //     url: string().required("Обложка обязательна"),
  //     title: string(),
  //     type: string(),
  //   })
  //   .required("Обложка не заполнена"),
  // lead: string().max(250, "Максимум 250 символов"),
  // status: string().required(),
  // tags: array().of(string()).required("Тэги не заполнены"),
  // seo_settings: object().shape({
  //   description: string().required("Описание статьи не заполнено"),
  //   keywords: array()
  //     .of(string())
  //     .required("Ключевые слова обязательны к заполнению"),
  //   og_type: string(),
  //   og_title: string(),
  //   og_description: string().required(),
  // }),
  // time: number()
  //   .min(1, "Время прочтения статьи не может быть меньше 1 минуты")
  //   .max(60, "Время прочтения статьи не может быть более 60 минут"),
  // title: string().required("Заголовок статьи не указан"),
  // type: string().required("Раздел не указан"),
})

// .oneOf([Yup.ref("password"), null], "Пароли не совпадают"),

type ArticleFormProps = {
  authors: Author[]
  initialArticle?: ArticleStore
  tags: Tag[]
  onSubmit: (article: Article) => Promise<void>
}

export const ArticleForm = memo(function ArticleForm(props: ArticleFormProps) {
  const { authors, initialArticle = article, tags, onSubmit } = props
  const classes = useStyles()

  const {
    values,
    errors,
    isSubmitting,
    isValid,
    handleSubmit,
    handleChange,
    handleReset,
    setFieldValue,
  } = useFormik<ArticleStore>({
    initialValues: {
      ...initialArticle,
    },
    // validationSchema: ArticleCreationSchema,
    // validateOnChange: true,
    onSubmit: async (values, { setSubmitting }) => {
      // await onSubmit(values)
      setSubmitting(false)
    },
    onReset: (values) => {},
  })

  console.log(errors)

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

  const tagsOptions = useMemo(
    () => computedUnusedOptionsByInitialOptionsList(tags, initialArticle.tags),
    [initialArticle.tags, tags],
  )

  const authorsOptions = useMemo(
    () =>
      computedUnusedOptionsByInitialOptionsList(
        authors,
        initialArticle.authors,
      ),
    [initialArticle.authors, authors],
  )

  return (
    <form onSubmit={handleSubmit} className={classes.root} noValidate={true}>
      <Grid container={true} spacing={4}>
        <Grid item={true} md={12} lg={8}>
          <FormControl margin="normal" fullWidth={true}>
            <TextField
              id="type"
              name="type"
              select={true}
              label="Раздел"
              required={true}
              value={values.type ?? ""}
              onChange={handleChange}
              variant="outlined"
            >
              {Object.keys(ARTICLE_TYPES_RECORD).map((type) => (
                <MenuItem key={type} value={type as Article["type"]}>
                  {ARTICLE_TYPES_RECORD[type]}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <TextField
            id="title"
            name="title"
            label="Заголовок"
            value={values.title}
            required={true}
            // error={!!errors.title}
            helperText="Не более 200 символов"
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            id="lead"
            name="lead"
            label="Лид"
            value={values.lead}
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
                <TextField
                  {...params}
                  label="Авторы &#42;"
                  variant="outlined"
                />
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
                <TextField {...params} label="Тэги &#42;" variant="outlined" />
              )}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <Editor value={values.body} onChange={handleChangeEditor} />
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
          <FormControl margin="normal" fullWidth={true}>
            <TextField
              id="status"
              name="status"
              select={true}
              label="Статус"
              required={true}
              value={values.status ?? ""}
              onChange={handleChange}
              variant="outlined"
            >
              {Object.keys(ARTICLE_STATUSES_RECORD).map((status) => (
                <MenuItem key={status} value={status as Article["status"]}>
                  {ARTICLE_STATUSES_RECORD[status]}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
            <FormControl margin="normal" fullWidth={true} variant="outlined">
              <DateTimePicker
                id="published_at"
                name="published_at"
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

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "block",
      flexGrow: 1,
    },
  }),
)
