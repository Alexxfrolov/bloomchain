import React, { useState, useEffect, useCallback, ChangeEvent } from "react"
import {
  makeStyles,
  createStyles,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Container,
  Paper,
  Typography,
  IconButton,
} from "@material-ui/core"
import { useSnackbar } from "notistack"
import { Skeleton } from "@material-ui/lab"
import AddBoxIcon from "@material-ui/icons/AddBox"
import { Pagination } from "@api/common/types"
import { mediaApi, MediaFile, UploadableMediaFile } from "@api/media"
import { ConditionalList } from "@ui"
import { DeleteDialog, RequestStatus } from "@features/core"
import {
  AddMediaFormDialog,
  EditMediaFormDialog,
  MediaList,
} from "@features/media"

type MediaPageState = {
  data: MediaFile[]
  error: string | null
  pagination: Pagination
  request_status: RequestStatus
  tabIndex: number
  type: MediaFile["type"]
  isOpenedDeleteDialog: boolean
  isOpenedAddFormDialog: boolean
  isOpenedEditFormDialog: boolean
  modifyingMediaFile: MediaFile | null
}

export function MediaPage() {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const [state, setState] = useState<MediaPageState>({
    data: [],
    error: null,
    pagination: {
      page: 1,
      page_size: 9,
      page_size_options: [25, 50, 100],
      total_pages: 1,
      total_items: 0,
    },
    request_status: "idle",
    tabIndex: 0,
    type: "image",
    isOpenedDeleteDialog: false,
    isOpenedAddFormDialog: false,
    isOpenedEditFormDialog: false,
    modifyingMediaFile: null,
  })

  useEffect(() => {
    const params = {
      type: state.type,
      page_size: state.pagination.page_size,
      page: state.pagination.page,
    } as const

    mediaApi
      .get(params)
      .then(({ data: { data, meta } }) =>
        setState((state) => ({
          ...state,
          data,
          pagination: { ...state.pagination, ...meta },
          error: null,
          request_status: "success",
        })),
      )
      .catch((error) => {
        setState((state) => ({ ...state, error, request_status: "error" }))
        enqueueSnackbar("Произошла ошибка", {
          variant: "error",
        })
      })
  }, [
    state.pagination.page_size,
    state.pagination.page,
    state.type,
    enqueueSnackbar,
  ])

  const handleChangeTab = useCallback(
    (_event: ChangeEvent<{}>, value: number) =>
      setState((state) => ({
        ...state,
        type: mapIndexToMediaType[value],
        tabIndex: value,
      })),
    [],
  )

  const handleDeleteButtonClick = useCallback(
    (media: MediaFile) =>
      setState((state) => ({
        ...state,
        isOpenedDeleteDialog: true,
        modifyingMediaFile: media,
      })),
    [],
  )

  const handleEditButtonClick = useCallback(
    (media: MediaFile) =>
      setState((state) => ({
        ...state,
        isOpenedEditFormDialog: true,
        modifyingMediaFile: media,
      })),
    [],
  )

  const handleDeleteConfirm = useCallback(async () => {
    const modifying = state.modifyingMediaFile
    if (modifying) {
      try {
        await mediaApi.remove(modifying.id)
        setState((state) => ({
          ...state,
          request_status: "success",
          error: null,
          isOpenedDeleteDialog: false,
          data: state.data.filter((item) => item.id !== modifying.id),
          modifyingMediaFile: null,
        }))
        enqueueSnackbar("Файл удален", {
          variant: "success",
        })
      } catch (error) {
        setState((state) => ({
          ...state,
          request_status: "error",
          isOpenedDeleteDialog: false,
          error,
        }))
        enqueueSnackbar("Произошла ошибка", {
          variant: "error",
        })
      }
    }
  }, [state.modifyingMediaFile, enqueueSnackbar])

  const handleChangePaginationPage = useCallback(
    (page: number) =>
      setState((state) => ({
        ...state,
        pagination: {
          ...state.pagination,
          page,
        },
      })),
    [],
  )

  const createMediaFile = useCallback(
    (mediaFile: UploadableMediaFile) => {
      setState((state) => ({
        ...state,
        error: null,
        request_status: "pending",
      }))

      return mediaApi
        .create(mediaFile)
        .then((response) => {
          setState((state) => ({
            ...state,
            error: null,
            request_status: "success",
            isOpenedAddFormDialog: false,
            data: [response.data, ...state.data],
          }))
          enqueueSnackbar("Файл сохранено", {
            variant: "success",
          })
        })
        .catch((error) => {
          setState((state) => ({
            ...state,
            isOpenedAddFormDialog: false,
            request_status: "error",
            error,
          }))
          enqueueSnackbar("Произошла ошибка", {
            variant: "error",
          })
        })
    },
    [enqueueSnackbar],
  )

  const updateMediaFile = useCallback(
    (modifedMediaFile: MediaFile) => {
      setState((state) => ({
        ...state,
        error: null,
        request_status: "pending",
      }))

      return mediaApi
        .update(modifedMediaFile)
        .then((response) => {
          setState((state) => ({
            ...state,
            error: null,
            request_status: "success",
            data: state.data.reduce<MediaFile[]>(
              (meida, mediaFile) => [
                ...meida,
                mediaFile.id !== response.data.id ? mediaFile : response.data,
              ],
              [],
            ),
            isOpenedEditFormDialog: false,
          }))
          enqueueSnackbar("Файл обновлен", {
            variant: "success",
          })
        })
        .catch((error) => {
          setState((state) => ({
            ...state,
            isOpenedEditFormDialog: false,
            request_status: "error",
            error,
          }))
          enqueueSnackbar("Произошла ошибка", {
            variant: "error",
          })
        })
    },
    [enqueueSnackbar],
  )

  return (
    <Container maxWidth="lg">
      <Paper>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h5" className={classes.title}>
            Медиа
          </Typography>
          <IconButton
            edge="end"
            onClick={() =>
              setState((state) => ({ ...state, isOpenedAddFormDialog: true }))
            }
            aria-label="add media"
          >
            <AddBoxIcon color="action" />
          </IconButton>
        </Toolbar>
        <AppBar position="static" color="default">
          <Tabs
            value={state.tabIndex}
            onChange={handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Изображения" className={classes.tab} />
            <Tab label="PDF" className={classes.tab} />
          </Tabs>
        </AppBar>
        <div className={classes.root}>
          {state.request_status === "pending" ||
          state.request_status === "idle" ? (
            <Skeleton width="100%" height="900px" />
          ) : (
            <ConditionalList
              list={state.data}
              renderExists={(list) => (
                <MediaList
                  media={list}
                  pagination={state.pagination}
                  onChangePaginationPage={handleChangePaginationPage}
                  onDelete={handleDeleteButtonClick}
                  onEdit={handleEditButtonClick}
                />
              )}
            />
          )}
        </div>
      </Paper>
      {state.isOpenedDeleteDialog && (
        <DeleteDialog
          isOpened={state.isOpenedDeleteDialog}
          onCancel={() =>
            setState((state) => ({
              ...state,
              isOpenedDeleteDialog: false,
            }))
          }
          onConfirm={handleDeleteConfirm}
        />
      )}
      {state.isOpenedAddFormDialog && (
        <AddMediaFormDialog
          isOpened={state.isOpenedAddFormDialog}
          type={state.type}
          onClose={() =>
            setState((state) => ({
              ...state,
              isOpenedAddFormDialog: false,
            }))
          }
          onSubmit={createMediaFile}
        />
      )}
      {state.modifyingMediaFile && state.isOpenedEditFormDialog && (
        <EditMediaFormDialog
          modifyingMediaFile={state.modifyingMediaFile}
          isOpened={state.isOpenedEditFormDialog}
          onClose={() =>
            setState((state) => ({ ...state, isOpenedEditFormDialog: false }))
          }
          onSubmit={updateMediaFile}
        />
      )}
    </Container>
  )
}

const mapIndexToMediaType = {
  0: "image",
  1: "pdf",
}

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
      justifyContent: "space-between",
    },
    tab: {
      width: "50%",
      minWidth: "50%",
    },
  }),
)
