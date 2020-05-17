import React, { memo, useCallback, useRef, useEffect } from "react"
import { useFormik } from "formik"
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormControl,
  FormHelperText,
  TextField,
  Button,
} from "@material-ui/core"
import { MediaFile } from "@api/media"

import { MediaCreationSchema } from "../schemes"

type AddMediaFormDialogProps = {
  isOpened: boolean
  type: MediaFile["type"]
  onClose: () => void
  onCreateMediaFile: (file: MediaFile) => Promise<void>
}

type AddMediaFormDialogState = Pick<
  MediaFile,
  "type" | "title" | "alt" | "source"
> & {
  file: File | null
}
// TODO: add upload form
// TODO: add touched check
export const AddMediaFormDialog = memo(function (
  props: AddMediaFormDialogProps,
) {
  const { isOpened, type, onClose, onCreateMediaFile } = props

  const imageRef = useRef<HTMLImageElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = useFormik<AddMediaFormDialogState>({
    enableReinitialize: true,
    initialValues: {
      file: null,
      title: "",
      alt: "",
      source: "",
      type,
    },
    initialTouched: {
      file: false,
      title: false,
      alt: false,
      source: false,
    },
    validationSchema: MediaCreationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await onCreateMediaFile(values)
      setSubmitting(false)
    },
  })

  useEffect(() => {
    if (values.file && imageRef.current) {
      const blobURL = window.URL.createObjectURL(values.file)
      imageRef.current.setAttribute("src", blobURL)

      return window.URL.revokeObjectURL(blobURL)
    }
  }, [values.file])

  const handleFileInputChange = useCallback(() => {
    if (fileInputRef.current && fileInputRef.current.files !== null) {
      setFieldValue("file", fileInputRef.current.files[0])
      setFieldTouched("file", true)
    }
  }, [setFieldValue, setFieldTouched])

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      aria-labelledby="upload-form-dialog"
    >
      <form onSubmit={handleSubmit} noValidate={true}>
        <DialogTitle id="upload-form-dialog">Загрузка файла</DialogTitle>
        <DialogContent>
          {values.file && (
            <FormControl margin="normal" fullWidth={true} variant="outlined">
              <img width="100%" ref={imageRef} alt="" />
            </FormControl>
          )}
          {!!errors.file && (
            <FormHelperText error={true}>{errors.file}</FormHelperText>
          )}
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <label htmlFor="media">
              <input
                accept="image/*"
                id="media"
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
              <Button variant="contained" color="primary" component="span">
                Добавить файл
              </Button>
            </label>
          </FormControl>
          <TextField
            id="alt"
            name="alt"
            label="Аттрибут аlt"
            required={true}
            disabled={isSubmitting}
            value={values.alt ?? ""}
            error={"alt" in errors && touched.alt}
            helperText={touched.alt ? errors.alt : undefined}
            type="text"
            fullWidth={true}
            margin="normal"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            id="title"
            name="title"
            label="Заголовок"
            type="text"
            value={values.title ?? ""}
            error={"title" in errors && touched.title}
            helperText={touched.title ? errors.title : undefined}
            fullWidth={true}
            disabled={isSubmitting}
            margin="normal"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            id="source"
            name="source"
            label="Источник"
            type="text"
            value={values.source ?? ""}
            error={"source" in errors && touched.source}
            helperText={touched.source ? errors.source : undefined}
            fullWidth={true}
            disabled={isSubmitting}
            margin="normal"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Отменить
          </Button>
          <Button type="submit" disabled={isSubmitting} color="primary">
            Загрузить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
})
