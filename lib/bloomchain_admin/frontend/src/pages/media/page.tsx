import nanoid from "nanoid"
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
  GridList,
  GridListTile,
  GridListTileBar,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Container,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
  Button,
  IconButton,
  Theme,
} from "@material-ui/core"
import { Alert, Skeleton } from "@material-ui/lab"
import DeleteIcon from "@material-ui/icons/Delete"
import AddBoxIcon from "@material-ui/icons/AddBox"
import EditIcon from "@material-ui/icons/Edit"
import { ConditionalList } from "@ui"
import { mediaApi, MediaFile, UploadableMediaFile } from "@api/media"
import { DeleteDialog } from "@features/core"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: "100%",
    },
    editInput: {
      color: "rgba(255, 255, 255, 0.8)",
      transition: theme.transitions.create("color", {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.standard,
      }),
      "&:focus": {},
    },
    editInputFocused: {
      color: "#fff",
    },
    titleBar: {
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
        "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
      transition: theme.transitions.create("color", {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.standard,
      }),
      "&:hover": {
        color: "rgba(255, 255, 255)",
      },
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

  const handleDeleteButtonClick = useCallback(
    (media: MediaFile) => () => {
      setOpenedDeleteDialog(true)
      setModifyingMediaFile(media)
    },
    [setModifyingMediaFile, setOpenedDeleteDialog],
  )

  const handleEditButtonClick = useCallback(
    (media: MediaFile) => () => {
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
      <Grid item={true} xs={12} container={true} spacing={3}>
        <Grid item={true}>
          <Typography component="h1" variant="h4" gutterBottom={false}>
            Медиа
          </Typography>
        </Grid>
        <Grid item={true}>
          <IconButton onClick={() => setOpenedAddFormDialog(true)}>
            <AddBoxIcon color="primary" />
          </IconButton>
        </Grid>
      </Grid>
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
              <Tab label="Изображения" id="image" />
              <Tab label="PDF" id="pdf" />
              {/* <Tab label="Видео" id="video" /> */}
            </Tabs>
          </AppBar>
          <div className={classes.root}>
            {loading ? (
              <Skeleton width="100%" height="900px" />
            ) : (
              <ConditionalList
                list={media}
                renderExists={(list) => (
                  <GridList
                    cellHeight={300}
                    className={classes.gridList}
                    style={{
                      height: media.length > 10 ? "900px" : "600px",
                    }}
                    cols={3}
                  >
                    {list.map((item) => (
                      <GridListTile key={nanoid()}>
                        {item.type === "image" ? (
                          <img src={item.url} alt={item.title} />
                        ) : (
                          <embed
                            src={item.url}
                            type="application/pdf"
                            width="100%"
                            height="100%"
                          />
                        )}
                        <GridListTileBar
                          titlePosition="bottom"
                          title={item.title ?? ""}
                          subtitle={<span>{item.source}</span>}
                          actionPosition="right"
                          actionIcon={
                            <Grid container={true}>
                              {item.type !== "pdf" && (
                                <Grid item={true}>
                                  <IconButton
                                    className={classes.icon}
                                    onClick={handleEditButtonClick(item)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Grid>
                              )}
                              <Grid item={true}>
                                <IconButton
                                  className={classes.icon}
                                  onClick={handleDeleteButtonClick(item)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          }
                          className={classes.titleBar}
                        />
                      </GridListTile>
                    ))}
                  </GridList>
                )}
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
    if (
      fileInputRef.current &&
      fileInputRef.current.files !== null &&
      fileInputRef.current.files.length === 1
    ) {
      const reader = new FileReader()

      reader.onload = function(event: ProgressEvent<FileReader>) {
        if (imageRef.current) {
          event?.target?.result?.[
            imageRef.current.setAttribute("src", event.target.result)
          ]
        }
      }

      reader.readAsDataURL(fileInputRef.current.files[0])

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
          <Grid container={true} spacing={4}>
            <Grid item={true} xs={12} container={true} spacing={2}>
              {media.file && (
                <Grid item={true} xs={12}>
                  <img width="100%" ref={imageRef} />
                </Grid>
              )}
              <Grid item={true} xs={12}>
                <input
                  accept="image/*"
                  id="media"
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
                <label htmlFor="media">
                  <Button variant="contained" color="primary" component="span">
                    Добавить файл
                  </Button>
                </label>
              </Grid>
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                id="alt"
                label="Alt"
                required={true}
                value={media.alt ?? ""}
                type="text"
                fullWidth
                onChange={handleChangeTextField("alt")}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                id="title"
                label="Title"
                type="text"
                value={media.title ?? ""}
                fullWidth
                onChange={handleChangeTextField("title")}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                id="source"
                label="Source"
                type="text"
                value={media.source ?? ""}
                fullWidth
                onChange={handleChangeTextField("source")}
              />
            </Grid>
          </Grid>
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
          <Grid container={true} spacing={4}>
            <Grid item={true} xs={12} container={true} spacing={2}>
              <Grid item={true} xs={12}>
                <img width="100%" src={media.url} />
              </Grid>
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                id="alt"
                label="Alt"
                required={true}
                value={media.alt ?? ""}
                type="text"
                fullWidth
                onChange={handleChangeTextField("alt")}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                id="title"
                label="Title"
                type="text"
                value={media.title ?? ""}
                fullWidth
                onChange={handleChangeTextField("title")}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                id="source"
                label="Source"
                type="text"
                value={media.source ?? ""}
                fullWidth
                onChange={handleChangeTextField("source")}
              />
            </Grid>
          </Grid>
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
