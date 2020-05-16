import React, { memo, Fragment, useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import {
  Box,
  AppBar,
  Tabs,
  Tab,
  Paper,
  Typography,
  Dialog,
  GridList,
  GridListTile,
  GridListTileBar,
  Toolbar,
  IconButton,
  makeStyles,
  createStyles,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import AddRoundedIcon from "@material-ui/icons/AddRounded"
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined"
import PermMediaOutlinedIcon from "@material-ui/icons/PermMediaOutlined"
import lightBlue from "@material-ui/core/colors/lightBlue"
import grey from "@material-ui/core/colors/grey"
import { ConditionalList } from "@ui"
import { mediaApi, MediaFile } from "@api/media"
import { RequestStatus } from "@features/core"

const MAX_FILE_SIZE = 1024 * 1024 * 50

type MediaUploadFormProps = {
  accept?: string | string[]
  disabled?: boolean

  maxSize?: number
  onUpload: (image: MediaFile) => void
}

type MediaUploadFormState = {
  tabIndex: number
  isOpenedDialog: boolean
  request_status: RequestStatus
  error: string | null
  data: MediaFile[]
}

export const MediaUploadForm = memo(function MediaUploadForm(
  props: MediaUploadFormProps,
) {
  const { accept = [], disabled, maxSize = MAX_FILE_SIZE, onUpload } = props
  const classes = useStyles()

  const [state, setState] = useState<MediaUploadFormState>({
    tabIndex: 0,
    isOpenedDialog: false,
    request_status: "success",
    error: null,
    data: [],
  })

  const handleDrop = useCallback(
    async (files) => {
      if (files.length === 1) {
        try {
          const { data: image } = await mediaApi.create({
            file: files[0],
            type: "image",
          })
          onUpload(image)
        } catch (error) {
          setState((state) => ({ ...state, error, request_status: "error" }))
        }
      }
    },
    [onUpload],
  )

  const handleDropAccepted = useCallback((files, event) => {}, [])
  const handleDropRejected = useCallback((files, event) => {}, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    disabled,
    maxSize,
    onDrop: handleDrop,
    onDropAccepted: handleDropAccepted,
    onDropRejected: handleDropRejected,
  })

  const handleChangeTab = useCallback(() => {
    setState((state) => ({ ...state, tabIndex: 0 }))
  }, [])

  const fetchData = useCallback(async () => {
    try {
      // FIX: add pagination
      const params = {
        type: "image" as MediaFile["type"],
      } as const
      const response = await mediaApi.get(params)
      return setState((state) => ({
        ...state,
        error: null,
        request_status: "success",
        data: response.data.data,
      }))
    } catch (error) {
      return setState((state) => ({ ...state, error, request_status: "error" }))
    }
  }, [])

  const openDialog = useCallback(async () => {
    setState((state) => ({ ...state, request_status: "pending", error: null }))
    await fetchData()
    setState((state) => ({ ...state, isOpenedDialog: true }))
  }, [fetchData])

  const closeDialog = useCallback(() => {
    setState((state) => ({ ...state, isOpenedDialog: false }))
  }, [])

  const handleAddButtonClick = useCallback(
    (image: MediaFile) => {
      onUpload(image)
      closeDialog()
    },
    [onUpload, closeDialog],
  )

  return (
    <Fragment>
      <Paper>
        <AppBar position="static" color="default">
          <Tabs
            value={state.tabIndex}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="Images upload panel"
          >
            <Tab
              title="Загрузить изображение"
              icon={<CloudUploadOutlinedIcon />}
              className={classes.tab}
              onChange={handleChangeTab}
              {...a11yProps(0)}
            />
            <Tab
              title="Загруженные изображения"
              icon={<PermMediaOutlinedIcon />}
              className={classes.tab}
              onClick={openDialog}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={state.tabIndex} index={0}>
          <div {...getRootProps()}>
            <Box p={2} className={classes.box}>
              <input {...getInputProps()} />
              <Fragment>
                <Typography align="center" variant="subtitle1" component="p">
                  <strong>Переместите сюда изображение</strong>
                </Typography>
                <Typography align="center">(или нажмите)</Typography>
              </Fragment>
            </Box>
          </div>
        </TabPanel>
      </Paper>
      <MediaLibraryDialog
        media={state.data}
        isOpened={state.isOpenedDialog}
        onAdd={handleAddButtonClick}
        onClose={closeDialog}
      />
    </Fragment>
  )
})

const useStyles = makeStyles((theme) =>
  createStyles({
    tab: {
      width: "50%",
      minWidth: "50%",
    },
    input: {
      display: "none",
    },
    box: {
      padding: "1.25rem 0.9375rem",
      display: "block",
      fontSize: "14px",
      letterSpacing: "0.0625rem",
      lineHeight: "140%",
      textAlign: "center",
      cursor: "pointer",
      border: "2px dashed rgba(0, 0, 0, 0.12)",
      borderRadius: theme.shape.borderRadius,
      transition: theme.transitions.create("border-color", {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.standard,
      }),
      "&:hover": {
        borderColor: "rgba(0, 0, 0, 0.75)",
      },
    },
    title: {
      flex: 1,
    },
    gridList: {
      width: "100%",
      height: "600px",
      transform: "translateZ(0)",
    },
    img: {
      maxWidth: "100%",
      height: "auto",
    },
    titleBar: {
      padding: "0 0.9375rem",
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
        "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    iconButton: {
      backgroundColor: grey[50],
      "&:hover": {
        backgroundColor: grey[400],
      },
    },
  }),
)

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  }
}

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  )
}

type MediaLibraryDialogProps = {
  media: MediaFile[]
  isOpened: boolean
  onAdd: (media: MediaFile) => void
  onClose: () => void
}

export const MediaLibraryDialog = memo(function MediaLibraryDialog(
  props: MediaLibraryDialogProps,
) {
  const { media, isOpened, onAdd, onClose } = props
  const classes = useStyles()

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      maxWidth="md"
      aria-labelledby="media-library-dialog-title"
    >
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Библиотека изображений
        </Typography>
        <IconButton color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <ConditionalList<MediaFile>
        list={media}
        renderExists={(list) => (
          <GridList cellHeight={200} className={classes.gridList} cols={3}>
            {list.map((item) => (
              <GridListTile key={item.id}>
                <img
                  src={item.url}
                  alt={item.title ?? ""}
                  className={classes.img}
                />
                <GridListTileBar
                  titlePosition="bottom"
                  title={item.title ?? ""}
                  subtitle={<span>{item.source ?? ""}</span>}
                  actionPosition="right"
                  actionIcon={
                    <IconButton
                      size="small"
                      className={classes.iconButton}
                      onClick={() => onAdd(item)}
                    >
                      <AddRoundedIcon htmlColor={lightBlue[800]} />
                    </IconButton>
                  }
                  className={classes.titleBar}
                />
              </GridListTile>
            ))}
          </GridList>
        )}
      />
    </Dialog>
  )
})
