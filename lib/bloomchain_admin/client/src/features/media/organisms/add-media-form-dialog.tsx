import React, { Fragment, memo, useCallback } from "react"
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
  List,
  ListItem,
  Typography,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Link,
} from "@material-ui/core"
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined"
import { getBlobUrl } from "@lib/blob"
import { MediaFileType, UploadableMediaFile } from "@api/media"
import { DropZone } from "@features/core"

import { MediaCreationSchema } from "../schemes"

type AddMediaFormDialogProps = {
  isOpened: boolean
  type: MediaFileType
  onClose: () => void
  onSubmit: (file: UploadableMediaFile) => Promise<void>
}

// TODO: add upload form
// TODO: add touched check
export const AddMediaFormDialog = memo(function (
  props: AddMediaFormDialogProps,
) {
  const { isOpened, type, onClose, onSubmit } = props

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik<Omit<UploadableMediaFile, "file"> & { file: File | null }>({
    enableReinitialize: true,
    initialValues: {
      file: null,
      title: "",
      alt: "",
      source: "",
      type,
    },
    validationSchema: MediaCreationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      await onSubmit(values as UploadableMediaFile)
      setSubmitting(false)
    },
  })

  const handleDropImage = useCallback(
    (files: File[]) => {
      setFieldValue("file", files[0])
    },
    [setFieldValue],
  )

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      aria-labelledby="upload-form-dialog"
    >
      <form onSubmit={handleSubmit} noValidate={true}>
        <DialogTitle id="upload-form-dialog">Загрузка файла</DialogTitle>
        <DialogContent>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <DropZone
              title={mapMediTypeToDropZoneTitle(type)}
              accept={
                type === "image"
                  ? ["image/jpeg", "image/png"]
                  : "application/pdf"
              }
              disabled={isSubmitting}
              onDrop={handleDropImage}
            />
            {"file" in errors && touched.file && (
              <FormHelperText error={true}>{errors.file}</FormHelperText>
            )}
          </FormControl>
          {type === "image" && values.file && getBlobUrl(values.file) && (
            <FormControl margin="normal" fullWidth={true}>
              <Typography variant="h6" component="h6" gutterBottom={true}>
                Предварительный просмотр:
              </Typography>
              <div
                style={{
                  display: "flex",
                  maxWidth: "100%",
                  maxHeight: "200px",
                }}
              >
                <img
                  style={{ objectFit: "contain" }}
                  width="100%"
                  src={getBlobUrl(values.file)}
                  alt=""
                />
              </div>
            </FormControl>
          )}
          {type === "pdf" && values.file && getBlobUrl(values.file) && (
            <FormControl margin="normal" fullWidth={true}>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PictureAsPdfOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    <Link href={getBlobUrl(values.file)} target="_blank">
                      {values.file.name}
                    </Link>
                  </ListItemText>
                </ListItem>
              </List>
            </FormControl>
          )}
          {type === "image" && (
            <Fragment>
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
            </Fragment>
          )}
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

const mapMediTypeToDropZoneTitle = (type: MediaFileType) => {
  switch (type) {
    case "pdf":
      return "Переместите сюда пдф"
    case "image":
      return "Переместите сюда изображение"
    default:
      return "Переместите сюда файл"
  }
}
