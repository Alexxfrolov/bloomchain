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
import { DropZone } from "@features/core"

import { ArchiveSchema } from "../schemes"

type AddArchiveFormDialogProps = {
  isOpened: boolean
  onSubmit: (cover: File, pdf: File) => Promise<void>
  onClose: () => void
}

export function AddArchiveFormDialog(props: AddArchiveFormDialogProps) {
  const { isOpened, onClose, onSubmit } = props

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    setFieldValue,
  } = useFormik<{
    cover: File | null
    pdf: File | null
  }>({
    initialValues: {
      cover: null,
      pdf: null,
    },
    validationSchema: ArchiveSchema,
    onSubmit: async ({ cover, pdf }, { setSubmitting, resetForm }) => {
      await onSubmit(cover as File, pdf as File)
      setSubmitting(false)
      resetForm()
    },
  })

  const handleDropImage = useCallback(
    (files: File[]) => {
      setFieldValue("cover", files[0])
    },
    [setFieldValue],
  )

  const handleDropPdf = useCallback(
    (files: File[]) => {
      setFieldValue("pdf", files[0])
    },
    [setFieldValue],
  )

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      aria-labelledby="add-archive-form-dialog"
    >
      <form onSubmit={handleSubmit} noValidate={true}>
        <DialogTitle id="add-archive-form-dialog">
          Добавить новый архив
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
              accept={["image/jpeg", "image/png"]}
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
            {values.cover && getBlobUrl(values.cover) && (
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
          {values.pdf && getBlobUrl(values.pdf) && (
            <FormControl margin="normal" fullWidth={true}>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PictureAsPdfOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    <Link href={getBlobUrl(values.pdf)} target="_blank">
                      {values.pdf.name}
                    </Link>
                  </ListItemText>
                </ListItem>
              </List>
            </FormControl>
          )}
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
