import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from "react"
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
import { Alert, Skeleton } from "@material-ui/lab"
import AddBoxIcon from "@material-ui/icons/AddBox"
import { Pagination } from "@api/common/types"
import { mediaApi, MediaFile } from "@api/media"
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
    request_status: "pending",
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
      .catch((error) =>
        setState((state) => ({ ...state, error, request_status: "error" })),
      )
  }, [state.pagination.page_size, state.pagination.page, state.type])

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
          isOpenedDeleteDialog: true,
          data: state.data.filter((item) => item.id !== modifying.id),
          modifyingMediaFile: null,
        }))
      } catch (error) {
        setState((state) => ({
          ...state,
          request_status: "error",
          error,
        }))
      }
    }
  }, [state.modifyingMediaFile])

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

  const createMediaFile = useCallback((mediaFile: MediaFile) => {
    setState((state) => ({
      ...state,
      error: null,
      request_status: "pending",
    }))

    return mediaApi
      .create(mediaFile)
      .then((response) =>
        setState((state) => ({
          ...state,
          error: null,
          request_status: "success",
          isOpenedAddFormDialog: false,
          data: [response.data, ...state.data],
        })),
      )
      .catch((error) =>
        setState((state) => ({
          ...state,
          isOpenedAddFormDialog: false,
          request_status: "error",
          error,
        })),
      )
  }, [])

  const updateMediaFile = useCallback((modifedMediaFile: MediaFile) => {
    setState((state) => ({
      ...state,
      error: null,
      request_status: "pending",
    }))

    return mediaApi
      .update(modifedMediaFile)
      .then((response) =>
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
        })),
      )
      .catch((error) =>
        setState((state) => ({
          ...state,
          isOpenedEditFormDialog: false,
          request_status: "error",
          error,
        })),
      )
  }, [])

  return (
    <Container maxWidth="lg">
      <Paper>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" className={classes.title}>
            Медиа
          </Typography>
          <IconButton
            edge="end"
            onClick={() =>
              setState((state) => ({ ...state, isOpenedAddFormDialog: true }))
            }
            aria-label="add media"
          >
            <AddBoxIcon color="primary" />
          </IconButton>
        </Toolbar>
        {state.request_status === "error" ? (
          <Alert color="error">Произошла ошибка</Alert>
        ) : (
          <Fragment>
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
              {state.request_status === "pending" ? (
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
          </Fragment>
        )}
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
          onCreateMediaFile={createMediaFile}
        />
      )}
      {state.modifyingMediaFile && state.isOpenedEditFormDialog && (
        <EditMediaFormDialog
          modifyingMediaFile={state.modifyingMediaFile}
          isOpened={state.isOpenedEditFormDialog}
          onClose={() =>
            setState((state) => ({ ...state, isOpenedEditFormDialog: false }))
          }
          onUpdateMedia={updateMediaFile}
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
      marginBottom: theme.spacing(2),
    },
    tab: {
      width: "50%",
      minWidth: "50%",
    },
  }),
)
