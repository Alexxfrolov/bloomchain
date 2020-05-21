import React, { memo } from "react"
import { useFormik } from "formik"
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormControl,
  TextField,
  Button,
} from "@material-ui/core"
import { MediaFile } from "@api/media"

import { MediaEditingSchema } from "../schemes"

type EditMediaFormDialogProps = {
  modifyingMediaFile: MediaFile
  isOpened: boolean
  onClose: () => void
  onUpdateMedia: (mediaFile: MediaFile) => Promise<void>
}

// TODO: add touched check
export const EditMediaFormDialog = memo(function (
  props: EditMediaFormDialogProps,
) {
  const { modifyingMediaFile, isOpened, onClose, onUpdateMedia } = props

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik<MediaFile>({
    enableReinitialize: true,
    initialValues: {
      ...modifyingMediaFile,
    },
    validationSchema: MediaEditingSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await onUpdateMedia(values)
      setSubmitting(false)
    },
  })

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      aria-labelledby="edit-media-file-form-dialog"
    >
      <form onSubmit={handleSubmit} noValidate={true}>
        <DialogTitle id="edit-media-file-form-dialog">
          Обновление файла
        </DialogTitle>
        <DialogContent>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <img width="100%" src={values.url} alt={values.alt ?? ""} />
          </FormControl>
          <TextField
            id="alt"
            name="alt"
            label="Аттрибут аlt"
            required={true}
            value={values.alt ?? ""}
            error={"alt" in errors && touched.alt}
            helperText={touched.alt ? errors.alt : undefined}
            type="text"
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            value={values.title ?? ""}
            error={"title" in errors && touched.title}
            helperText={touched.title ? errors.title : undefined}
            fullWidth={true}
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
            disabled={isSubmitting}
            value={values.source ?? ""}
            error={"source" in errors && touched.source}
            helperText={touched.source ? errors.source : undefined}
            fullWidth={true}
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
          <Button type="submit" color="primary" disabled={isSubmitting}>
            Обновить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
})
