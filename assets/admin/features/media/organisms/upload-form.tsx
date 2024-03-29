import React, {
  memo,
  Fragment,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from "react"
import { useDropzone } from "react-dropzone"
import {
  Box,
  AppBar,
  Tabs,
  Tab,
  Grid,
  Paper,
  Typography,
  FormControl,
  Dialog,
  GridList,
  GridListTile,
  GridListTileBar,
  Toolbar,
  CircularProgress,
  IconButton,
  makeStyles,
  createStyles,
} from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination"
import CloseIcon from "@material-ui/icons/Close"
import AddRoundedIcon from "@material-ui/icons/AddRounded"
import { Pagination as PaginationType } from "@api/common/types"
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined"
import PermMediaOutlinedIcon from "@material-ui/icons/PermMediaOutlined"
import EditIcon from "@material-ui/icons/Edit"
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline"
import lightBlue from "@material-ui/core/colors/lightBlue"
import grey from "@material-ui/core/colors/grey"
import { ConditionalList } from "@ui"
import { mediaApi, MediaFile } from "@api/media"
import { RequestStatus } from "@features/core"

import { EditMediaFormDialog } from "./edit-media-form-dialog"

const MAX_FILE_SIZE = 1024 * 1024 * 50

type MediaUploadFormProps = {
  accept?: string | string[]
  cover_id?: number | null
  disabled?: boolean
  maxSize?: number
  onUpload: (file: MediaFile) => void
  onDeletePreview?: () => void
}

type MediaUploadFormState = {
  tabIndex: number
  isOpenedDialog: boolean
  request_status: RequestStatus
  error: string | null
  uploadedFile: MediaFile | null
  isOpenedEditDialog: boolean
}

export const MediaUploadForm = memo(function MediaUploadForm(
  props: MediaUploadFormProps,
) {
  const {
    accept = [],
    disabled,
    cover_id,
    maxSize = MAX_FILE_SIZE,
    onUpload,
    onDeletePreview,
  } = props
  const classes = useStyles()

  const [state, setState] = useState<MediaUploadFormState>({
    tabIndex: 0,
    isOpenedDialog: false,
    request_status: "success",
    error: null,
    isOpenedEditDialog: false,
    uploadedFile: null,
  })

  useEffect(() => {
    if (cover_id) {
      mediaApi
        .getById(cover_id)
        .then((response) =>
          setState((state) => ({ ...state, uploadedFile: response.data })),
        )
    } else {
      setState((state) => ({ ...state, uploadedFile: null }))
    }
  }, [cover_id])

  const handleDrop = useCallback(
    async (files) => {
      if (files.length === 1) {
        setState((state) => ({
          ...state,
          request_status: "pending",
          error: null,
        }))
        try {
          const { data } = await mediaApi.create({
            file: files[0],
            type: "image",
          })
          setState((state) => ({
            ...state,
            request_status: "success",
            error: null,
            uploadedFile: data,
          }))
          onUpload(data)
        } catch (error) {
          setState((state) => ({ ...state, error, request_status: "error" }))
        }
      }
    },
    [onUpload],
  )

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    disabled,
    maxSize,
    onDrop: handleDrop,
  })

  const handleChangeTab = useCallback(() => {
    setState((state) => ({ ...state, tabIndex: 0 }))
  }, [])

  const openDialog = useCallback(async () => {
    setState((state) => ({ ...state, isOpenedDialog: true }))
  }, [])

  const closeDialog = useCallback(() => {
    setState((state) => ({ ...state, isOpenedDialog: false }))
  }, [])

  const updateMediaFile = (file: MediaFile) =>
    mediaApi
      .update(file)
      .then((response) =>
        setState((state) => ({
          ...state,
          request_status: "success",
          error: null,
          uploadedFile: response.data,
        })),
      )
      .catch((error) =>
        setState((state) => ({
          ...state,
          error,
          request_status: "error",
        })),
      )
      .finally(() =>
        setState((state) => ({
          ...state,
          isOpenedEditDialog: false,
        })),
      )

  const handleAddButtonClick = useCallback(
    (image: MediaFile) => {
      onUpload(image)
      setState((state) => ({ ...state, uploadedFile: image }))
      closeDialog()
    },
    [onUpload, closeDialog],
  )

  const handleDeleteButtonClick = useCallback(() => {
    if (onDeletePreview) {
      onDeletePreview()
    }
    setState((state) => ({ ...state, uploadedFile: null }))
  }, [onDeletePreview])

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
      {state.isOpenedDialog && (
        <MediaLibraryDialog
          isOpened={state.isOpenedDialog}
          onAdd={handleAddButtonClick}
          onClose={closeDialog}
        />
      )}
      {state.uploadedFile && (
        <FormControl margin="normal" fullWidth={true}>
          <Typography variant="h6" component="h6" gutterBottom={true}>
            Предварительный просмотр:
          </Typography>
          <div className={classes.imagePreview}>
            <img
              className={classes.img}
              src={state.uploadedFile.url}
              alt={state.uploadedFile.alt ?? ""}
            />
            <GridListTileBar
              titlePosition="bottom"
              actionPosition="right"
              actionIcon={
                <div className={classes.imagePreviewActions}>
                  <IconButton
                    size="small"
                    color="inherit"
                    onClick={() =>
                      setState((state) => ({
                        ...state,
                        isOpenedEditDialog: true,
                      }))
                    }
                  >
                    <EditIcon htmlColor="white" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="inherit"
                    onClick={handleDeleteButtonClick}
                  >
                    <DeleteOutlineIcon htmlColor="white" />
                  </IconButton>
                </div>
              }
              className={classes.titleBar}
            />
          </div>
        </FormControl>
      )}
      {state.uploadedFile && (
        <EditMediaFormDialog
          isOpened={state.isOpenedEditDialog}
          modifyingMediaFile={state.uploadedFile}
          onSubmit={updateMediaFile}
          onClose={() =>
            setState((state) => ({ ...state, isOpenedEditDialog: false }))
          }
        />
      )}
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
    imagePreview: {
      position: "relative",
      display: "flex",
      maxWidth: "300px",
    },
    imagePreviewActions: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
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
      maxWidth: "200px",
      maxHeight: "200px",
      objectFit: "contain",
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
  isOpened: boolean
  onAdd: (media: MediaFile) => void
  onClose: () => void
}

type MediaLibraryDialogState = {
  request_status: RequestStatus
  error: string | null
  data: MediaFile[]
  pagination: PaginationType
}

export const MediaLibraryDialog = memo(function MediaLibraryDialog(
  props: MediaLibraryDialogProps,
) {
  const { isOpened, onAdd, onClose } = props
  const classes = useStyles()

  const [state, setState] = useState<MediaLibraryDialogState>({
    request_status: "idle",
    data: [],
    error: null,
    pagination: {
      page: 1,
      page_size: 15,
      page_size_options: [15, 30, 50],
      total_pages: 1,
      total_items: 0,
    },
  })

  useEffect(() => {
    const params = {
      type: "image" as MediaFile["type"],
      page: state.pagination.page,
      page_size: state.pagination.page_size,
    } as const

    setState((state) => ({ ...state, error: null, request_status: "pending" }))

    mediaApi
      .get(params)
      .then((response) => {
        setState((state) => ({
          ...state,
          error: null,
          request_status: "success",
          data: response.data.data,
          pagination: {
            ...state.pagination,
            ...response.data.meta,
          },
        }))
      })
      .catch((error) => {
        setState((state) => ({ ...state, error, request_status: "error" }))
      })
  }, [state.pagination.page, state.pagination.page_size])

  const handleChangePagination = useCallback(
    (_event: ChangeEvent<unknown>, page: number) =>
      setState((state) => ({
        ...state,
        pagination: {
          ...state.pagination,
          page,
        },
      })),
    [],
  )

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
      {state.request_status === "idle" || state.request_status === "pending" ? (
        <Box m={4}>
          <Grid container={true} alignItems="center" justify="center">
            <CircularProgress color="primary" size={60} />
          </Grid>
        </Box>
      ) : (
        <ConditionalList<MediaFile>
          list={state.data}
          renderExists={(list) => (
            <Fragment>
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
              <Box m={3}>
                <Grid container={true} alignItems="center" justify="center">
                  <Pagination
                    page={state.pagination.page}
                    count={state.pagination.total_pages}
                    onChange={handleChangePagination}
                    color="primary"
                    disabled={
                      state.request_status === "idle" ||
                      state.request_status === "pending"
                    }
                    showFirstButton={true}
                    showLastButton={true}
                  />
                </Grid>
              </Box>
            </Fragment>
          )}
        />
      )}
    </Dialog>
  )
})
