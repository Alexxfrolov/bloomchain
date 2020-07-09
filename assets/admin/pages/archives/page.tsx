import React, { useEffect, useState, useCallback } from "react"
import {
  Container,
  Paper,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
  createStyles,
} from "@material-ui/core"
import { useSnackbar } from "notistack"
import AddBoxIcon from "@material-ui/icons/AddBox"
import { OrderDirection, Pagination } from "@api/common/types"
import { mediaApi, UploadableMediaFile, MediaFile } from "@api/media"
import { archivesApi, Archive } from "@api/archives"
import { RequestStatus } from "@features/core"
import {
  ArchivesTable,
  AddArchiveFormDialog,
  EditArchiveFormDialog,
} from "@features/archives"

type ArchivesPageState = {
  request_status: RequestStatus
  error: string | null
  data: Archive[]
  pagination: Pagination
  orderDirection: OrderDirection
  orderBy: keyof Archive
  isOpenedAddFormDialog: boolean
  isOpenedEditFormDialog: boolean
  modifyingArchive: Archive | null
}

export function ArchivesPage() {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const [state, setState] = useState<ArchivesPageState>({
    request_status: "pending",
    error: null,
    data: [],
    pagination: {
      page: 1,
      page_size: 25,
      page_size_options: [25, 50, 100],
      total_pages: 1,
      total_items: 0,
    },
    orderDirection: "desc",
    orderBy: "inserted_at",
    isOpenedAddFormDialog: false,
    isOpenedEditFormDialog: false,
    modifyingArchive: null,
  })

  useEffect(() => {
    const params = {
      page_size: state.pagination.page_size,
      page: state.pagination.page,
      orderDirection: state.orderDirection,
      orderBy: state.orderBy,
    } as const

    archivesApi
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
  }, [
    state.pagination.page_size,
    state.pagination.page,
    state.orderDirection,
    state.orderBy,
  ])

  const handleTablePageChange = useCallback(
    (page: number) =>
      setState((state) => ({
        ...state,
        pagination: { ...state.pagination, page: page + 1 },
      })),
    [],
  )

  const handleChangeTableRowsPerPage = useCallback(
    (page_size: number) =>
      setState((state) => ({
        ...state,
        pagination: {
          ...state.pagination,
          page: 1,
          page_size,
        },
      })),
    [],
  )

  const handleTableOrderChange = useCallback(
    (orderBy: keyof Archive, orderDirection: OrderDirection) => {
      setState((state) => ({ ...state, orderDirection, orderBy }))
    },
    [],
  )

  const handleClickRowEdit = useCallback((modifyingArchive: Archive) => {
    setState((state) => ({
      ...state,
      isOpenedEditFormDialog: true,
      modifyingArchive,
    }))
  }, [])

  const createArchive = useCallback(
    async (cover: File, pdf: File) => {
      setState((state) => ({ ...state, request_status: "pending" }))
      const files: UploadableMediaFile[] = [
        { type: "image", file: cover },
        { type: "pdf", file: pdf },
      ]

      try {
        const response = await Promise.all(
          files.map(async (file) => {
            return await mediaApi.create(file)
          }),
        )
        const [cover_id, pdf_id] = response.map((resp) => resp.data.id)
        const archiveResponse = await archivesApi.create(cover_id, pdf_id)
        setState((state) => ({
          ...state,
          error: null,
          request_status: "success",
          data: [archiveResponse.data, ...state.data],
          isOpenedAddFormDialog: false,
        }))
        enqueueSnackbar("Архив успешно создан", {
          variant: "success",
        })
      } catch (error) {
        setState((state) => ({
          ...state,
          error,
          request_status: "error",
          isOpenedAddFormDialog: false,
        }))
        enqueueSnackbar("Произошла ошибка", {
          variant: "error",
        })
      }
    },
    [enqueueSnackbar],
  )

  const updateArchive = useCallback(
    async (data: {
      cover?: File | MediaFile | null
      pdf?: File | MediaFile | null
    }) => {
      const files = Object.keys(data).reduce(
        (acc, key) => [...acc, { type: key, file: data[key] }],
        [],
      ) as UploadableMediaFile[]
      setState((state) => ({ ...state, request_status: "pending" }))
      try {
        const response = await Promise.all(
          files.map(async (file) => {
            return await mediaApi.create(file)
          }),
        )
        const [cover_id, pdf_id] = response.map((resp) => resp.data.id)
        const archiveResponse = await archivesApi.create(cover_id, pdf_id)
        setState((state) => ({
          ...state,
          error: null,
          request_status: "success",
          data: [archiveResponse.data, ...state.data],
          isOpenedAddFormDialog: false,
        }))
        enqueueSnackbar("Архив успешно отредактирован", {
          variant: "success",
        })
      } catch (error) {
        setState((state) => ({
          ...state,
          error,
          request_status: "error",
          isOpenedAddFormDialog: false,
        }))
        enqueueSnackbar("Произошла ошибка", {
          variant: "error",
        })
      }
    },
    [enqueueSnackbar],
  )

  const deleteArchive = useCallback(
    async (archive: Archive) => {
      setState((state) => ({ ...state, request_status: "pending" }))
      try {
        archivesApi.remove(archive.id)
        setState((state) => ({
          ...state,
          error: null,
          request_status: "success",
          data: state.data.filter((item) => item.id !== archive.id),
        }))
      } catch (error) {
        setState((state) => ({ ...state, error, request_status: "error" }))
        enqueueSnackbar("Произошла ошибка", {
          variant: "error",
        })
      }
    },
    [enqueueSnackbar],
  )

  return (
    <Container maxWidth="lg">
      <Paper>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h5" className={classes.title}>
            Исследования (архив)
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
        <ArchivesTable
          data={state.data}
          isLoading={state.request_status === "pending"}
          pagination={state.pagination}
          onChangePage={handleTablePageChange}
          onChangeRowsPerPage={handleChangeTableRowsPerPage}
          onOrderChange={handleTableOrderChange}
          onRowDelete={deleteArchive}
          onRowEdit={handleClickRowEdit}
        />
        <AddArchiveFormDialog
          isOpened={state.isOpenedAddFormDialog}
          onClose={() =>
            setState((state) => ({ ...state, isOpenedAddFormDialog: false }))
          }
          onSubmit={createArchive}
        />
        {state.modifyingArchive && (
          <EditArchiveFormDialog
            data={state.modifyingArchive}
            isOpened={state.isOpenedEditFormDialog}
            onClose={() =>
              setState((state) => ({ ...state, isOpenedEditFormDialog: false }))
            }
            onSubmit={updateArchive}
          />
        )}
      </Paper>
    </Container>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
      justifyContent: "space-between",
    },
  }),
)
