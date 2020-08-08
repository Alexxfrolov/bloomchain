import React, { useCallback } from "react"
import { useFormik } from "formik"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { ru } from "date-fns/locale"
import { getBlobUrl } from "@lib/blob"
import type { Banner, UploadableBanner } from "@api/banners"
import { DropZone } from "@features/core"

import { BannerCreateSchema } from "../schemes"

interface InitialBanner {
  client: string | null
  desktop_cover: {
    type: "banner"
    file: File | null
  }
  mobile_cover: {
    type: "banner"
    file: File | null
  }
  date_start: string | Date | null
  date_end: string | Date | null
  status: Banner["status"]
  target_url: string | null
  type: Banner["type"] | null
}

const initialBanner: InitialBanner = {
  client: null,
  desktop_cover: {
    type: "banner",
    file: null,
  },
  mobile_cover: {
    type: "banner",
    file: null,
  },
  date_start: null,
  date_end: null,
  status: "waiting",
  target_url: null,
  type: null,
}

type AddBannerDialogProps = {
  isOpened: boolean
  onSubmit: (banner: UploadableBanner) => Promise<void>
  onClose: () => void
}

export function AddBannerDialog(props: AddBannerDialogProps) {
  const { isOpened, onClose, onSubmit } = props

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = useFormik<InitialBanner>({
    initialValues: {
      ...initialBanner,
    },
    validateOnChange: true,
    validateOnBlur: false,
    validationSchema: BannerCreateSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await onSubmit(values as UploadableBanner)
      setSubmitting(false)
      resetForm()
    },
  })

  const handleDropCover = useCallback(
    (field: "desktop_cover.file" | "mobile_cover.file") => (files: File[]) => {
      setFieldValue(field, files[0])
    },
    [setFieldValue],
  )

  const handleDateChange = useCallback(
    (field: "date_start" | "date_end") => (date: Date | null) => {
      setFieldValue(field, date)
      setFieldTouched(field, true)
    },
    [setFieldValue, setFieldTouched],
  )

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      aria-labelledby="add-archive-form-dialog"
    >
      <form onSubmit={handleSubmit} noValidate={true}>
        <DialogTitle id="add-archive-form-dialog">
          Добавить новый баннер
        </DialogTitle>
        <DialogContent dividers={true}>
          <TextField
            name="client"
            label="Имя клиента"
            required={true}
            value={values.client ?? ""}
            error={"client" in errors && touched.client}
            helperText={touched.client ? errors.client : undefined}
            disabled={isSubmitting}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            autoComplete="new-banner-client"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            name="target_url"
            label="Ссылка для перехода"
            required={true}
            value={values.target_url ?? ""}
            error={"target_url" in errors && touched.target_url}
            helperText={touched.target_url ? errors.target_url : undefined}
            disabled={isSubmitting}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            autoComplete="new-banner-target-url"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormControl margin="normal" fullWidth={true}>
            <TextField
              id="type"
              name="type"
              select={true}
              label="Расположение баннера"
              required={true}
              disabled={isSubmitting}
              value={values.type ?? ""}
              error={"type" in errors && touched.type}
              helperText={touched.type ? errors.type : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
            >
              {["header", "article"].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl margin="normal" fullWidth={true}>
            <Typography variant="h6" component="h6">
              Баннер для desktop *
            </Typography>
          </FormControl>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <DropZone
              title="Переместите сюда изображение"
              accept={["image/jpeg", "image/png", "image/jpg", "image/gif"]}
              disabled={isSubmitting}
              onDrop={handleDropCover("desktop_cover.file")}
            />
            {"desktop_cover" in errors && touched.desktop_cover?.file && (
              <FormHelperText error={true}>
                {errors.desktop_cover?.file}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl margin="normal" fullWidth={true}>
            <Typography variant="h6" component="h6" gutterBottom={true}>
              Предварительный просмотр:
            </Typography>
            {values.desktop_cover?.file &&
              getBlobUrl(values.desktop_cover.file) && (
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                  width="100%"
                  src={getBlobUrl(values.desktop_cover.file)}
                  alt=""
                />
              )}
          </FormControl>
          <FormControl margin="normal" fullWidth={true}>
            <Typography variant="h6" component="h6">
              Баннер для mobile *
            </Typography>
          </FormControl>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <DropZone
              title="Переместите сюда изображение"
              accept={["image/jpeg", "image/png", "image/jpg", "image/gif"]}
              disabled={isSubmitting}
              onDrop={handleDropCover("mobile_cover.file")}
            />
            {"mobile_cover" in errors && touched.mobile_cover?.file && (
              <FormHelperText error={true}>
                {errors.mobile_cover?.file}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl margin="normal" fullWidth={true}>
            <Typography variant="h6" component="h6" gutterBottom={true}>
              Предварительный просмотр:
            </Typography>
            {values.mobile_cover?.file && getBlobUrl(values.mobile_cover.file) && (
              <img
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                }}
                width="100%"
                src={getBlobUrl(values.mobile_cover.file)}
                alt=""
              />
            )}
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
            <FormControl margin="normal" fullWidth={true} variant="outlined">
              <DatePicker
                name="date_start"
                variant="dialog"
                margin="none"
                fullWidth={true}
                required={true}
                disablePast={true}
                error={"date_start" in errors && "date_start" in touched}
                helperText={
                  "date_start" in errors && "date_start" in touched
                    ? errors.date_start
                    : null
                }
                inputVariant="outlined"
                label="Дата начала показов"
                format="dd/MM/yyyy"
                value={values.date_start}
                onChange={handleDateChange("date_start")}
              />
            </FormControl>
            <FormControl margin="normal" fullWidth={true} variant="outlined">
              <DatePicker
                name="date_end"
                variant="dialog"
                required={true}
                margin="none"
                disablePast={true}
                fullWidth={true}
                error={"date_end" in errors && "date_end" in touched}
                helperText={
                  "date_end" in errors && "date_end" in touched
                    ? errors.date_end
                    : null
                }
                inputVariant="outlined"
                label="Дата окончания показов"
                format="dd/MM/yyyy"
                value={values.date_end}
                onChange={handleDateChange("date_end")}
              />
            </FormControl>
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Отменить
          </Button>
          <Button type="submit" disabled={isSubmitting} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
