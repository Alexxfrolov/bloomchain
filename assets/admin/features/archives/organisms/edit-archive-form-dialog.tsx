import React, { useCallback } from "react"
import { useFormik } from "formik"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  FormControl,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Link,
  Button,
} from "@material-ui/core"
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined"
import { getBlobUrl } from "@lib/blob"
import { Archive } from "@api/archives"
import { MediaFile } from "@api/media"
import { DropZone } from "@features/core"

import { ArchiveCreationSchema } from "../schemes"

type EditArchiveFormDialogProps = {
  data: Archive
  isOpened: boolean
  onSubmit: (data: {
    id: number
    cover?: File | null
    pdf?: File | null
  }) => Promise<void>
  onClose: () => void
}

export function EditArchiveFormDialog(props: EditArchiveFormDialogProps) {
  const { data, isOpened, onClose, onSubmit } = props

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = useFormik<{
    cover: File | MediaFile | null
    pdf: File | MediaFile | null
  }>({
    enableReinitialize: true,
    initialValues: {
      cover: data.cover,
      pdf: data.pdf,
    },
    validationSchema: ArchiveCreationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const files = Object.keys(values).reduce(
        (acc, key) =>
          values[key] instanceof File
            ? Object.assign(acc, { [key]: values[key] })
            : acc,
        {},
      ) as {
        cover?: File | null
        pdf?: File | null
      }
      if (Object.keys(files).length) {
        await onSubmit({ id: data.id, ...files })
      }
      setSubmitting(false)
      resetForm()
    },
  })

  const handleDropImage = useCallback(
    (files: File[]) => {
      setFieldValue("cover", files[0])
      setFieldTouched("cover", true)
    },
    [setFieldValue, setFieldTouched],
  )

  const handleDropPdf = useCallback(
    (files: File[]) => {
      setFieldValue("pdf", files[0])
      setFieldTouched("pdf", true)
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
          Редактирование архива
        </DialogTitle>
        <DialogContent dividers={true}>
          <FormControl margin="normal" fullWidth={true}>
            <Typography variant="h6" component="h6">
              Обложка
            </Typography>
          </FormControl>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <DropZone
              title="Переместите сюда изображение"
              accept={["image/jpeg", "image/jpg", "image/png"]}
              disabled={isSubmitting}
              onDrop={handleDropImage}
            />
            {"cover" in errors && touched.cover && (
              <FormHelperText error={true}>{errors.cover}</FormHelperText>
            )}
          </FormControl>
          <FormControl margin="normal" fullWidth={true}>
            <Typography variant="h6" component="h6" gutterBottom={true}>
              Предварительный просмотр:
            </Typography>
            {values.cover && values.cover instanceof File ? (
              <img
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  objectFit: "contain",
                }}
                width="100%"
                src={getBlobUrl(values.cover)}
                alt=""
              />
            ) : (
              <img
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  objectFit: "contain",
                }}
                width="100%"
                src={data.cover.url}
                alt=""
              />
            )}
          </FormControl>
          <FormControl margin="normal" fullWidth={true}>
            <Typography variant="h6" component="h6">
              PDF
            </Typography>
          </FormControl>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <DropZone
              title="Переместите сюда пдф"
              accept="application/pdf"
              disabled={isSubmitting}
              onDrop={handleDropPdf}
            />
            {"pdf" in errors && touched.pdf && (
              <FormHelperText error={true}>{errors.pdf}</FormHelperText>
            )}
          </FormControl>
          <FormControl margin="normal" fullWidth={true}>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PictureAsPdfOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  {values.pdf && values.pdf instanceof File ? (
                    <Link href={getBlobUrl(values.pdf)} target="_blank">
                      {values.pdf.name}
                    </Link>
                  ) : (
                    <Link href={data.pdf.url} target="_blank">
                      {data.pdf.title}
                    </Link>
                  )}
                </ListItemText>
              </ListItem>
            </List>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Отменить
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !Object.keys(touched).length}
            color="primary"
          >
            Сохранить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
