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
import { useFormik } from "formik"
import { Editor } from "@lib/editor"
import { Article } from "@api/articles"
import { Author } from "@api/authors"
import { MediaFile } from "@api/media"
import { Tag } from "@api/tags"
import { MediaUploadForm } from "@features/media"

import { article, ArticleStore } from "../model/article.store"
import { ArticleCreationSchema } from "../schemes"
import {
  computedUnusedOptionsByInitialOptionsList,
  ARTICLE_STATUSES_RECORD,
  ARTICLE_TYPES_RECORD,
} from "../lib"

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
    touched,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleReset,
    handleBlur,
    setFieldValue,
    setFieldTouched,
  } = useFormik<ArticleStore>({
    enableReinitialize: true,
    initialValues: {
      ...initialArticle,
    },
    initialTouched: {
      type: false,
      title: false,
      lead: false,
      authors: [],
      tags: [],
      body: false,
      cover: false,
      status: false,
      published_at: false,
      time: false,
      seo_settings: {
        keywords: false,
        description: false,
        og_type: false,
        og_title: false,
        og_description: false,
      },
    },
    validationSchema: ArticleCreationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await onSubmit(values)
      setSubmitting(false)
    },
  })

  const handleChangeEditor = useCallback(
    (value: string) => {
      setFieldValue("body", value)
      setFieldTouched("body", true)
    },
    [setFieldValue, setFieldTouched],
  )

  const handleDateChange = useCallback(
    (date: Date | null) => {
      setFieldValue("published_at", date)
      setFieldTouched("published_at", true)
    },
    [setFieldValue, setFieldTouched],
  )

  const handleChangeTagsSelect = useCallback(
    (_event: ChangeEvent<{}>, tags: Tag[]) => {
      setFieldValue("tags", tags)
      setFieldTouched("tags", true)
    },
    [setFieldValue, setFieldTouched],
  )

  const handleChangeAuthorsSelect = useCallback(
    (_event: ChangeEvent<{}>, authors: Author[]) => {
      setFieldValue("authors", authors)
      setFieldTouched("authors", true)
    },
    [setFieldValue, setFieldTouched],
  )

  const handleUpload = useCallback(
    (image: MediaFile) => {
      setFieldValue("cover", image)
      setFieldTouched("cover", true)
    },
    [setFieldValue, setFieldTouched],
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
              disabled={isSubmitting}
              value={values.type ?? ""}
              error={"type" in errors && touched.type}
              helperText={touched.type ? errors.type : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
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
            disabled={isSubmitting}
            error={"title" in errors && touched.title}
            helperText={touched.title ? errors.title : undefined}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            id="lead"
            name="lead"
            label="Лид"
            value={values.lead}
            error={"lead" in errors && touched.lead}
            helperText={
              touched.lead
                ? errors.lead
                  ? errors.lead
                  : "Не более 255 символов"
                : undefined
            }
            disabled={isSubmitting}
            fullWidth={true}
            inputProps={{ maxLength: 255 }}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
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
                  required={true}
                  label="Авторы"
                  error={"authors" in errors && !!touched.authors?.length}
                  helperText={
                    !!touched.authors?.length ? errors.authors : undefined
                  }
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
                <TextField
                  {...params}
                  label="Тэги"
                  required={true}
                  error={"tags" in errors && !!touched.tags?.length}
                  helperText={!!touched.tags?.length ? errors.tags : undefined}
                  variant="outlined"
                />
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
            <MediaUploadForm
              accept={["image/jpeg", "image/png"]}
              disabled={isSubmitting}
              onUpload={handleUpload}
            />
            {errors.cover && (
              <FormHelperText error={true}>{errors.cover}</FormHelperText>
            )}
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
              disabled={isSubmitting}
              value={values.status ?? ""}
              error={"status" in errors && touched.status}
              helperText={touched.status ? errors.status : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
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
                disabled={values.status !== "ready" || isSubmitting}
                error={"published_at" in errors && touched.published_at}
                helperText={
                  touched.published_at
                    ? errors.published_at
                      ? errors.published_at
                      : "Доступно при статусе Готово к публикации"
                    : undefined
                }
                inputVariant="outlined"
                label="Дата публикации"
                format="dd/MM/yyyy HH:mm"
                value={values.published_at}
                onChange={handleDateChange}
              />
            </FormControl>
          </MuiPickersUtilsProvider>
          <TextField
            id="time"
            name="time"
            label="Время прочтения"
            type="number"
            value={values.time ?? ""}
            error={"time" in errors && touched.time}
            helperText={touched.time ? errors.time : undefined}
            disabled={isSubmitting}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            autoComplete="new-article-time"
            onChange={handleChange}
            onBlur={handleBlur}
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
              error={
                !!errors.seo_settings?.keywords &&
                touched.seo_settings?.keywords
              }
              helperText={
                touched.seo_settings?.keywords
                  ? errors.seo_settings?.keywords
                  : undefined
              }
              fullWidth={true}
              disabled={isSubmitting}
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
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
              error={
                !!errors.seo_settings?.description &&
                touched.seo_settings?.description
              }
              helperText={
                touched.seo_settings?.description
                  ? errors.seo_settings?.description
                  : undefined
              }
              inputProps={{ maxLength: 255 }}
              disabled={isSubmitting}
              fullWidth={true}
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormHelperText variant="filled">
              Не более 255 символов. По умолчанию лид статьи.
            </FormHelperText>
          </FormControl>
          <FormControl margin="dense" fullWidth={true}>
            <TextField
              id="seo_settings.og_type"
              name="seo_settings.og_type"
              label="og:type"
              value={values.seo_settings.og_type}
              error={
                !!errors.seo_settings?.og_type && touched.seo_settings?.og_type
              }
              helperText={
                touched.seo_settings?.og_type
                  ? errors.seo_settings?.og_type
                  : undefined
              }
              disabled={isSubmitting}
              fullWidth={true}
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
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
              error={
                !!errors.seo_settings?.og_title &&
                touched.seo_settings?.og_title
              }
              helperText={
                touched.seo_settings?.og_title
                  ? errors.seo_settings?.og_title
                  : undefined
              }
              disabled={isSubmitting}
              fullWidth={true}
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
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
              inputProps={{ maxLength: 255 }}
              disabled={isSubmitting}
              error={
                !!errors.seo_settings?.og_description &&
                touched.seo_settings?.og_description
              }
              helperText={
                touched.seo_settings?.og_description
                  ? errors.seo_settings?.og_description
                  : undefined
              }
              fullWidth={true}
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormHelperText variant="filled">
              Не более 255 символов. По умолчанию лид статьи.
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
              disabled={isSubmitting}
              onClick={handleReset}
            >
              Очистить поля
            </Button>
          </Grid>
          <Grid item={true}>
            <Button
              type="submit"
              disabled={isSubmitting}
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
