import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
  RefObject,
  FormEvent,
} from "react"
import {
  makeStyles,
  createStyles,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Container,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core"
import { Alert, Skeleton } from "@material-ui/lab"
import AddBoxIcon from "@material-ui/icons/AddBox"
import { mediaApi, MediaFile, UploadableMediaFile } from "@api/media"
import { DeleteDialog } from "@features/core"
import { MediaList } from "@features/media"

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
      marginBottom: theme.spacing(2),
    },
    tab: {
      width: "50%",
      minWidth: "50%",
    },
  }),
)

export const MediaPage = () => {
  const classes = useStyles()

  const [type, setType] = useState<MediaFile["type"]>("image")
  const [tabIndex, setTabIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [media, setMedia] = useState<MediaFile[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const response = await mediaApi.get(type)
        setMedia(response.data.data)
      } catch {
        setError(true)
      }

      setLoading(false)
    }
    fetchData()
  }, [type])

  const [openedDeleteDialog, setOpenedDeleteDialog] = useState(false)
  const [openedAddFormDialog, setOpenedAddFormDialog] = useState(false)
  const [openedEditFormDialog, setOpenedEditFormDialog] = useState(false)
  const [
    modifyingMediaFile,
    setModifyingMediaFile,
  ] = useState<MediaFile | null>(null)

  const handleAddMedia = useCallback(
    (file: MediaFile) => {
      setMedia([file, ...media])
    },
    [media, setMedia],
  )

  const editMediaFile = useCallback(
    (modifedMediaFile: MediaFile) => {
      setMedia(
        media.reduce(
          (media: MediaFile[], user) => [
            ...media,
            user.id !== modifedMediaFile.id ? user : modifedMediaFile,
          ],
          [],
        ),
      )
    },
    [media, setMedia],
  )

  const handleChangeTab = useCallback(
    (event: ChangeEvent<{ id: MediaFile["type"] }>, newValue: number) => {
      setType(event.currentTarget.id)
      setTabIndex(newValue)
    },
    [setTabIndex, setType],
  )

  const deleteButtonHandler = useCallback(
    (media: MediaFile) => {
      setOpenedDeleteDialog(true)
      setModifyingMediaFile(media)
    },
    [setModifyingMediaFile, setOpenedDeleteDialog],
  )

  const editButtonHandler = useCallback(
    (media: MediaFile) => {
      setOpenedEditFormDialog(true)
      setModifyingMediaFile(media)
    },
    [setOpenedEditFormDialog, setModifyingMediaFile],
  )

  const handleConfirmDelete = useCallback(async () => {
    if (modifyingMediaFile) {
      try {
        await mediaApi.remove(modifyingMediaFile.id)
        setOpenedDeleteDialog(false)
        setMedia(media.filter((item) => item.id !== modifyingMediaFile.id))
      } catch {
        setError(true)
      }
    }
  }, [media, modifyingMediaFile, setMedia, setOpenedDeleteDialog])

  return (
    <Container maxWidth="lg">
      <Toolbar disableGutters={true} className={classes.toolbar}>
        <Typography component="h1" variant="h4" className={classes.title}>
          Медиа
        </Typography>
        <IconButton
          edge="end"
          onClick={() => setOpenedAddFormDialog(true)}
          aria-label="add media"
        >
          <AddBoxIcon color="primary" />
        </IconButton>
      </Toolbar>
      {error ? (
        <Alert color="error">Произошла ошибка</Alert>
      ) : (
        <Fragment>
          <AppBar position="static" color="default">
            <Tabs
              value={tabIndex}
              onChange={handleChangeTab}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Изображения" id="image" className={classes.tab} />
              <Tab label="PDF" id="pdf" className={classes.tab} />
              {/* <Tab label="Видео" id="video" /> */}
            </Tabs>
          </AppBar>
          <div className={classes.root}>
            {loading ? (
              <Skeleton width="100%" height="900px" />
            ) : (
              <MediaList
                media={media}
                onDelete={deleteButtonHandler}
                onEdit={editButtonHandler}
              />
            )}
          </div>
        </Fragment>
      )}
      {openedDeleteDialog && (
        <DeleteDialog
          opened={openedDeleteDialog}
          onCancel={() => setOpenedDeleteDialog(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
      {openedAddFormDialog && (
        <AddFormDialog
          opened={openedAddFormDialog}
          type={type}
          onClose={() => setOpenedAddFormDialog(false)}
          onAddMedia={handleAddMedia}
        />
      )}
      {modifyingMediaFile && openedEditFormDialog && (
        <EditFormDialog
          modifyingMediaFile={modifyingMediaFile}
          opened={openedEditFormDialog}
          onClose={() => setOpenedEditFormDialog(false)}
          onUpdateMedia={editMediaFile}
        />
      )}
    </Container>
  )
}

type AddFormDialogProps = {
  opened: boolean
  type: MediaFile["type"]
  onClose: () => void
  onAddMedia: (file: MediaFile) => void
}

const AddFormDialog = ({
  opened,
  type,
  onClose,
  onAddMedia,
}: AddFormDialogProps) => {
  const imageRef: RefObject<HTMLImageElement | null> = useRef(null)
  const fileInputRef: RefObject<HTMLInputElement | null> = useRef(null)
  const [media, setMedia] = useState<
    Pick<UploadableMediaFile, "title" | "alt" | "source" | "type"> & {
      file: File | null
    }
  >({
    file: null,
    title: "",
    alt: "",
    source: "",
    type,
  })

  const handleChangeTextField = useCallback(
    (field: keyof UploadableMediaFile) => (
      event: ChangeEvent<{ value: string }>,
    ) => {
      setMedia({ ...media, [field]: event.currentTarget.value })
    },
    [media, setMedia],
  )

  const handleFileInputChange = useCallback(() => {
    if (fileInputRef.current && fileInputRef.current.files !== null) {
      const blobURL = URL.createObjectURL(fileInputRef.current.files[0])

      if (imageRef.current) {
        imageRef.current.setAttribute("src", blobURL)
      }

      setMedia({ ...media, file: fileInputRef.current.files[0] })
    }
  }, [fileInputRef, imageRef, media, setMedia])

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      if (media.file) {
        try {
          const response = await mediaApi.create(media)
          onClose()
          onAddMedia(response.data)
        } catch {}
      }
    },
    [media, onAddMedia, onClose],
  )

  return (
    <Dialog
      open={opened}
      onClose={onClose}
      aria-labelledby="upload-form-dialog"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="upload-form-dialog">Загрузка файла</DialogTitle>
        <DialogContent>
          {media.file && (
            <FormControl margin="normal" fullWidth={true} variant="outlined">
              <img width="100%" ref={imageRef} />
            </FormControl>
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
            label="Аттрибут аlt"
            required={true}
            value={media.alt ?? ""}
            type="text"
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChangeTextField("alt")}
          />
          <TextField
            id="title"
            label="Заголовок"
            type="text"
            value={media.title ?? ""}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChangeTextField("title")}
          />
          <TextField
            id="source"
            label="Источник"
            type="text"
            value={media.source ?? ""}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChangeTextField("source")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Отменить
          </Button>
          <Button type="submit" color="primary">
            Загрузить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

type EditFormDialogProps = {
  modifyingMediaFile: MediaFile
  opened: boolean
  onClose: () => void
  onUpdateMedia: (file: MediaFile) => void
}

const EditFormDialog = ({
  modifyingMediaFile,
  opened,
  onClose,
  onUpdateMedia,
}: EditFormDialogProps) => {
  const [media, setMedia] = useState<MediaFile>({ ...modifyingMediaFile })

  const handleChangeTextField = useCallback(
    (field: keyof UploadableMediaFile) => (
      event: ChangeEvent<{ value: string }>,
    ) => {
      setMedia({ ...media, [field]: event.currentTarget.value })
    },
    [media, setMedia],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()

      try {
        const response = await mediaApi.update(media)
        onClose()
        onUpdateMedia(response.data)
      } catch {}
    },
    [media, onUpdateMedia, onClose],
  )

  return (
    <Dialog
      open={opened}
      onClose={onClose}
      aria-labelledby="edit-media-file-form-dialog"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="edit-media-file-form-dialog">
          Обновление файла
        </DialogTitle>
        <DialogContent>
          <FormControl margin="normal" fullWidth={true} variant="outlined">
            <img width="100%" src={media.url} />
          </FormControl>
          <TextField
            id="alt"
            label="Аттрибут аlt"
            required={true}
            value={media.alt ?? ""}
            type="text"
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChangeTextField("alt")}
          />
          <TextField
            id="title"
            label="Заголовок"
            type="text"
            value={media.title ?? ""}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChangeTextField("title")}
          />
          <TextField
            id="source"
            label="Источник"
            type="text"
            value={media.source ?? ""}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            onChange={handleChangeTextField("source")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Отменить
          </Button>
          <Button type="submit" color="primary">
            Обновить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
