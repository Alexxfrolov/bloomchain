import React, { useMemo, useCallback, ChangeEvent, useEffect } from "react"
import { useSnackbar, VariantType } from "notistack"
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
import { RichEditor } from "@lib/rich-editor"
import type { Article } from "@api/articles"
import type { Author } from "@api/authors"
import type { Tag } from "@api/tags"
import type { Section } from "@api/sections"
import { MediaUploadForm } from "@features/media"

import { articleStore, ArticleStore } from "../model"
import { ArticleSchema } from "../schemes"
import {
  computedUnusedOptionsByInitialOptionsList,
  ARTICLE_STATUSES_RECORD,
  ARTICLE_OG_TYPES,
} from "../lib"

type ArticleFormProps = {
  initialArticle?: ArticleStore
  authors: Author[]
  sections: Section[]
  tags: Tag[]
  onSubmit: (article: Article, cb?: () => void) => Promise<void>
}

export function ArticleForm(props: ArticleFormProps) {
  const {
    authors,
    initialArticle = articleStore,
    sections,
    tags,
    onSubmit,
  } = props
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

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
    validateOnChange: true,
    validateOnBlur: false,
    validationSchema: ArticleSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await onSubmit(values, resetForm)
      setSubmitting(false)
    },
  })

  const createNotification = useCallback(
    (error: string, variant: VariantType = "error") => {
      enqueueSnackbar(error, {
        variant,
      })
    },
    [enqueueSnackbar],
  )

  useEffect(() => {
    if (isSubmitting) {
      Object.values(errors)
        .flatMap((error) =>
          typeof error === "string" ? error : Object.values(error),
        )
        .forEach((error) => {
          createNotification(error)
        })
    }
  }, [errors, isSubmitting, createNotification])

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
    (image: import("@api/media").MediaFile) => {
      setFieldValue("cover_id", image.id)
      setFieldTouched("cover_id", true)
    },
    [setFieldValue, setFieldTouched],
  )

  const deleteCover = useCallback(() => {
    setFieldValue("cover_id", null)
    setFieldTouched("cover_id", true)
  }, [setFieldValue, setFieldTouched])

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
              {sections.map((section) => (
                <MenuItem key={section.slug} value={section.slug}>
                  {section.name}
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
            value={values.lead ?? ""}
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
            <Autocomplete
              id="authors"
              multiple={true}
              options={authorsOptions}
              noOptionsText="Пусто"
              value={values.authors}
              disableCloseOnSelect={true}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option) =>
                Boolean(
                  values.authors.find((author) => author.id === option.id),
                )
              }
              onChange={handleChangeAuthorsSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required={true}
                  label="Авторы"
                  error={
                    "authors" in errors &&
                    "authors" in touched &&
                    !touched.authors?.length
                  }
                  helperText={
                    "authors" in touched && !touched.authors?.length
                      ? errors.authors
                      : undefined
                  }
                  variant="outlined"
                />
              )}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <Autocomplete
              id="tags"
              multiple={true}
              options={tagsOptions}
              noOptionsText="Пусто"
              value={values.tags}
              disableCloseOnSelect={true}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option) =>
                Boolean(values.tags.find((author) => author.id === option.id))
              }
              onChange={handleChangeTagsSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Тэги"
                  required={true}
                  error={
                    "tags" in errors &&
                    "tags" in touched &&
                    !touched.tags?.length
                  }
                  helperText={
                    "tags" in touched && !touched.tags?.length
                      ? errors.tags
                      : undefined
                  }
                  variant="outlined"
                />
              )}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth={true}>
            <RichEditor content={values.body} onChange={handleChangeEditor} />
            {"body" in errors && touched.body && (
              <FormHelperText error={true}>{errors.body}</FormHelperText>
            )}
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
              cover_id={values.cover_id}
              disabled={isSubmitting}
              onUpload={handleUpload}
              onDeletePreview={deleteCover}
            />
          </FormControl>
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
                error={"published_at" in errors && "published_at" in touched}
                helperText={
                  "published_at" in errors && "published_at" in touched
                    ? errors.published_at
                    : "Доступно при статусе Готово к публикации"
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
              value={values.seo_settings.keywords ?? ""}
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
              Разделяйте слова запятыми или пробелами.
            </FormHelperText>
          </FormControl>
          <FormControl margin="dense" fullWidth={true}>
            <TextField
              id="seo_settings.description"
              name="seo_settings.description"
              label="Description"
              value={values.seo_settings.description ?? ""}
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
              select={true}
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
            >
              {ARTICLE_OG_TYPES.map((og_type) => (
                <MenuItem key={og_type} value={og_type}>
                  {og_type}
                </MenuItem>
              ))}
            </TextField>
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
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "block",
      flexGrow: 1,
    },
  }),
)
