import React, { memo, useState, useCallback, useRef, FormEvent } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  FormControl,
  Button,
} from "@material-ui/core"
import { archivesApi, Archive } from "@api/archives"
import { mediaApi, MediaFile } from "@api/media"
import { MediaUploadForm } from "@features/media"

type AddArchiveFormDialogProps = {
  addArchive: (archive: Archive) => Promise<void>
}

export const AddArchiveFormDialog = memo(function AddArchiveFormDialog(
  props: AddArchiveFormDialogProps,
) {
  const { addArchive } = props

  const [opened, setOpened] = useState(false)

  const [archive, setArchive] = useState({
    cover: null,
    pdf: {
      file: null,
      id: null,
      url: "",
      type: "pdf",
    },
  })

  const pdfFileInputRef = useRef<HTMLInputElement>(null)
  const pdfRef = useRef<HTMLEmbedElement>(null)

  const handlePDFFileInputChange = useCallback(() => {
    if (pdfFileInputRef.current && pdfFileInputRef.current.files !== null) {
      const blobURL = URL.createObjectURL(pdfFileInputRef.current.files[0])
      pdfRef.current?.setAttribute("data", blobURL)
      pdfRef.current?.removeAttribute("hidden")
      pdfRef.current?.setAttribute("style", "height: 300px;")
      setArchive({
        ...archive,
        pdf: {
          ...archive.pdf,
          file: pdfFileInputRef.current.files[0],
        },
      })
    }
  }, [archive, setArchive])

  // const handleChangeTextField = useCallback(
  //   (event: ChangeEvent<{ value: string }>) => {
  //     setArchive({
  //       ...archive,
  //       cover: {
  //         ...archive.cover,
  //         alt: event.currentTarget.value,
  //       },
  //     })
  //   },
  //   [archive, setArchive],
  // )

  const handleUpload = useCallback(
    (image: MediaFile) => {
      setArchive({
        ...archive,
        cover: image,
      })
    },
    [archive, setArchive],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      try {
        const pdf = await mediaApi.create(archive.pdf)
        const response = await archivesApi.create(archive.cover.id, pdf.data.id)
        addArchive(response.data)
        setOpened(false)
      } catch {}
    },
    [archive, setOpened, addArchive],
  )

  return (
    <Dialog
      open={opened}
      onClose={() => setOpened(false)}
      aria-labelledby="add-archive-form-dialog"
    >
      <form onSubmit={handleSubmit} noValidate={true}>
        <DialogTitle id="add-archive-form-dialog">
          Добавить новый архив
        </DialogTitle>
        <DialogContent dividers={true}>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <Typography variant="h6" component="h6" gutterBottom={false}>
              Обложка
            </Typography>
          </FormControl>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <MediaUploadForm onUpload={handleUpload} />
          </FormControl>
          {archive.cover && (
            <FormControl margin="normal" fullWidth={true} variant="outlined">
              <img
                src={archive.cover.url}
                width="100%"
                alt={archive.cover?.alt ?? ""}
              />
            </FormControl>
          )}
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <Typography variant="h6" component="h6">
              PDF
            </Typography>
          </FormControl>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <object
              ref={pdfRef}
              type="application/pdf"
              width="100%"
              hidden
              aria-label="pdf preview"
            ></object>
          </FormControl>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <input
              accept="application/pdf"
              id="pdf"
              ref={pdfFileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={handlePDFFileInputChange}
            />
            <label htmlFor="pdf">
              <Button variant="contained" color="primary" component="span">
                Добавить PDF
              </Button>
            </label>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpened(false)} color="primary">
            Отменить
          </Button>
          <Button type="submit" color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
})
