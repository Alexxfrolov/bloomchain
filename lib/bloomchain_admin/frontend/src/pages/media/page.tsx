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
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
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
  const [editableMediaFile, setEditableMediaFile] = useState<MediaFile | null>(
    null,
  )

  const handleAddMedia = useCallback(
    (file: MediaFile) => {
      setMedia([file, ...media])
    },
    [media, setMedia],
  )

  const editMediaFile = useCallback(
    (editedMediaFile: MediaFile) => {
      setMedia(
        media.reduce(
          (media: MediaFile[], user) => [
            ...media,
            user.id !== editedMediaFile.id ? user : editedMediaFile,
          ],
          [],
        ),
      )
    },
    [media, setMedia],
  )

  const [dateStart, setDateStart] = useState<Date | null>(null)
  const [dateEnd, setDateEnd] = useState<Date | null>(new Date())

  const handleDateStartChange = useCallback(
    (date: Date | null) => {
      setDateStart(date)
    },
    [setDateStart],
  )

  const handleDateEndChange = useCallback(
    (date: Date | null) => {
      setDateEnd(date)
    },
    [setDateEnd],
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
      setEditableMediaFile(media)
    },
    [setEditableMediaFile, setOpenedDeleteDialog],
  )

  const handleEditButtonClick = useCallback(
    (media: MediaFile) => () => {
      setOpenedEditFormDialog(true)
      setEditableMediaFile(media)
    },
    [setOpenedEditFormDialog, setEditableMediaFile],
  )

  const handleConfirmDelete = useCallback(async () => {
    if (editableMediaFile) {
      try {
        const response = await mediaApi.remove(editableMediaFile.id)
        setOpenedDeleteDialog(false)
        setMedia(media.filter((item) => item.id !== editableMediaFile.id))
      } catch {
        setError(true)
      }
    }
  }, [media, editableMediaFile, setMedia, setOpenedDeleteDialog])

  return (
    <Container maxWidth="lg">
      <Grid container={true} spacing={3}>
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
            <Grid item={true} xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container={true} spacing={4} alignItems="center">
                  <Grid item={true}>
                    <KeyboardDatePicker
                      variant="dialog"
                      margin="normal"
                      id="date-start"
                      label="Дата начал"
                      format="dd/MM/yyyy"
                      value={dateStart}
                      onChange={handleDateStartChange}
                      KeyboardButtonProps={{
                        "aria-label": "Выберите дату",
                      }}
                    />
                  </Grid>
                  <Grid item={true}>
                    <KeyboardDatePicker
                      variant="dialog"
                      margin="normal"
                      id="date-end"
                      label="Дата окончания"
                      format="dd/MM/yyyy"
                      value={dateEnd}
                      onChange={handleDateEndChange}
                      KeyboardButtonProps={{
                        "aria-label": "Выберите дату",
                      }}
                    />
                  </Grid>
                  <Grid item={true}>
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      Фильтровать
                    </Button>
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item={true} xs={12}>
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
            </Grid>
            <Grid item={true} xs={12}>
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
                              <img src={item.link} alt={item.title} />
                            ) : (
                              <embed
                                src={item.link}
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
            </Grid>
          </Fragment>
        )}
      </Grid>
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
      {editableMediaFile && openedEditFormDialog && (
        <EditFormDialog
          editableMediaFile={editableMediaFile}
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
  editableMediaFile: MediaFile
  opened: boolean
  onClose: () => void
  onUpdateMedia: (file: MediaFile) => void
}

const EditFormDialog = ({
  editableMediaFile,
  opened,
  onClose,
  onUpdateMedia,
}: EditFormDialogProps) => {
  const [media, setMedia] = useState<MediaFile>({ ...editableMediaFile })

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
                <img width="100%" src={media.link} />
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
