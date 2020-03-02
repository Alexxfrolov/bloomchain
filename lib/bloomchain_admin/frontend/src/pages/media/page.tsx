import nanoid from "nanoid"
import React, {
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
  Container,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
  Input,
  Button,
  IconButton,
  Theme,
} from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import DeleteIcon from "@material-ui/icons/Delete"
import AddBoxIcon from "@material-ui/icons/AddBox"
import { ConditionalList } from "@ui"
import { mediaApi, Media } from "@api/media"
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
      height: 900,
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

  const [loading, setLoading] = useState(false)
  const [media, setMedia] = useState<Media[]>([])
  const [error, setError] = useState(false)
  const [openedDeleteDialog, setOpenedDeleteDialog] = useState(false)
  const [openedAddFormDialog, setOpenedAddFormDialog] = useState(false)
  const [currentMediaFile, setCurrentMediaFile] = useState<Media | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const response = await mediaApi.get()
        setMedia(response.data.data)
      } catch {
        setError(true)
      }

      setLoading(false)
    }
    fetchData()
  }, [])

  const handleAddMedia = useCallback(
    (file: Media) => {
      setMedia([file, ...media])
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

  const handleImageTitleChange = useCallback(
    (id: number) => async (event: ChangeEvent<{ value: string }>) => {
      const response = await mediaApi.update({
        id,
        title: event.currentTarget.value,
      })
    },
    [],
  )

  const handleDeleteButtonClick = useCallback(
    (media: Media) => () => {
      setOpenedDeleteDialog(true)
      setCurrentMediaFile(media)
    },
    [setCurrentMediaFile, setOpenedDeleteDialog],
  )

  const handleConfirmDelete = useCallback(async () => {
    const response = await mediaApi.remove(currentMediaFile.id)
    setOpenedDeleteDialog(false)
    if (response.status === 204) {
      setMedia(media.filter((item) => item.id !== currentMediaFile.id))
    }
  }, [media, currentMediaFile, setMedia, setOpenedDeleteDialog])

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
                <Button variant="contained" color="primary" component="span">
                  Фильтровать
                </Button>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
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
                            height="300px"
                          />
                        )}
                        <GridListTileBar
                          titlePosition="bottom"
                          title={
                            <Input
                              type="text"
                              name="title"
                              value={item.title || ""}
                              fullWidth={true}
                              disableUnderline={true}
                              inputProps={{ "aria-label": item.title }}
                              onChange={handleImageTitleChange(item.id)}
                              className={classes.editInput}
                              classes={{ focused: classes.editInputFocused }}
                            />
                          }
                          subtitle={<span>{item.source}</span>}
                          actionPosition="right"
                          actionIcon={
                            <IconButton
                              className={classes.icon}
                              onClick={handleDeleteButtonClick(item)}
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
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
          onClose={() => setOpenedAddFormDialog(false)}
          onAddMedia={handleAddMedia}
        />
      )}
    </Container>
  )
}

type AddFormDialogProps = {
  opened: boolean
  onClose: () => void
  onAddMedia: (file: Media) => void
}

const AddFormDialog = ({ opened, onClose, onAddMedia }: AddFormDialogProps) => {
  const imageRef: RefObject<HTMLImageElement | null> = useRef(null)
  const fileInputRef: RefObject<HTMLInputElement | null> = useRef(null)
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [alt, setAlt] = useState("")
  const [source, setSource] = useState("")

  const handleChangeTitleField = useCallback(
    (event: ChangeEvent<{ value: string }>) => {
      setTitle(event.currentTarget.value)
    },
    [setTitle],
  )

  const handleChangeAltField = useCallback(
    (event: ChangeEvent<{ value: string }>) => {
      setAlt(event.currentTarget.value)
    },
    [setAlt],
  )

  const handleChangeSourceField = useCallback(
    (event: ChangeEvent<{ value: string }>) => {
      setSource(event.currentTarget.value)
    },
    [setSource],
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
          event.target.result &&
            imageRef.current.setAttribute("src", event.target.result)
        }
      }

      reader.readAsDataURL(fileInputRef.current.files[0])

      setFile(fileInputRef.current.files[0])
    }
  }, [fileInputRef, imageRef, setFile])

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      if (file) {
        const image = {
          image: file,
          title,
          alt,
          source,
        }
        const response = await mediaApi.create(image)
        if (response.status === 201) {
          onClose()
          onAddMedia(response.data)
        }
      }
    },
    [file, title, alt, source, onAddMedia, onClose],
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
              {file && (
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
                type="text"
                fullWidth
                onChange={handleChangeAltField}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                id="title"
                label="Title"
                type="text"
                fullWidth
                onChange={handleChangeTitleField}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                id="source"
                label="Source"
                type="text"
                fullWidth
                onChange={handleChangeSourceField}
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
