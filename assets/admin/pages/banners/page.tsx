import React, { useEffect, useState, useCallback, ChangeEvent } from "react"
import {
  AppBar,
  Container,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core"
import { useSnackbar } from "notistack"
import AddBoxIcon from "@material-ui/icons/AddBox"
import { bannersApi } from "@api/banners"
import {
  AddBannerDialog,
  BannersTable,
  EditBannerDialog,
} from "@features/banners"
import type { OrderDirection, Pagination } from "@api/common/types"
import type { Banner, EditableBanner, UploadableBanner } from "@api/banners"
import type { RequestStatus } from "@features/core"

type BannersPageState = {
  data: Banner[]
  error: string | null
  isOpenedAddFormDialog: boolean
  isOpenedEditFormDialog: boolean
  modifyingBanner: EditableBanner | null
  orderBy: keyof Banner
  orderDirection: OrderDirection
  pagination: Pagination
  request_status: RequestStatus
  tabIndex: number
}

export function BannersPage() {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const [state, setState] = useState<BannersPageState>({
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
    modifyingBanner: null,
    tabIndex: 0,
  })

  useEffect(() => {
    const params = {
      page_size: state.pagination.page_size,
      page: state.pagination.page,
      orderDirection: state.orderDirection,
      orderBy: state.orderBy,
      status: mapTabNumberToBannerStatus[state.tabIndex],
    } as const

    bannersApi
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
    state.tabIndex,
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
    (orderBy: keyof Banner, orderDirection: OrderDirection) => {
      setState((state) => ({ ...state, orderDirection, orderBy }))
    },
    [],
  )

  const handleClickRowEdit = useCallback((modifyingBanner: Banner) => {
    setState((state) => ({
      ...state,
      isOpenedEditFormDialog: true,
      modifyingBanner: {
        ...modifyingBanner,
        desktop_cover: {
          ...modifyingBanner.desktop_cover,
          file: null,
        },
        mobile_cover: {
          ...modifyingBanner.mobile_cover,
          file: null,
        },
      },
    }))
  }, [])

  const handleChangeTabs = (_event: ChangeEvent<{}>, tabIndex: number) => {
    setState((state) => ({ ...state, tabIndex }))
  }

  const createBanner = useCallback(
    async (banner: UploadableBanner) => {
      setState((state) => ({ ...state, request_status: "pending" }))
      try {
        const response = await bannersApi.create(banner)
        setState((state) => ({
          ...state,
          error: null,
          request_status: "success",
          data: [response.data, ...state.data],
          isOpenedAddFormDialog: false,
        }))
        enqueueSnackbar("Баннер успешно создан", {
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

  const updateBanner = useCallback(
    async (banner: EditableBanner) => {
      setState((state) => ({ ...state, request_status: "pending" }))
      try {
        const response = await bannersApi.update(banner)
        setState((state) => ({
          ...state,
          error: null,
          request_status: "success",
          data:
            response.data.status === mapTabNumberToBannerStatus[state.tabIndex]
              ? state.data.map((item) =>
                  item.id === response.data.id
                    ? {
                        ...item,
                        ...response.data,
                      }
                    : item,
                )
              : state.data.filter((item) => item.id !== response.data.id),
          isOpenedEditFormDialog: false,
        }))
        enqueueSnackbar("Баннер успешно отредактирован", {
          variant: "success",
        })
      } catch (error) {
        setState((state) => ({
          ...state,
          error,
          request_status: "error",
          isOpenedEditFormDialog: false,
        }))
        enqueueSnackbar("Произошла ошибка", {
          variant: "error",
        })
      }
    },
    [enqueueSnackbar],
  )

  const deteleBanner = useCallback(
    async (banner: Banner) => {
      setState((state) => ({ ...state, request_status: "pending" }))
      try {
        await bannersApi.remove(banner.id)
        setState((state) => ({
          ...state,
          error: null,
          request_status: "success",
          data: state.data.filter((item) => item.id !== banner.id),
        }))
        enqueueSnackbar("Баннер удален", {
          variant: "success",
        })
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
            Баннеры
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
            onChange={handleChangeTabs}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Активные" {...a11yProps(0)} />
            <Tab label="Неактивные" {...a11yProps(1)} />
            <Tab label="В ожидании" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <BannersTable
          data={state.data}
          isLoading={state.request_status === "pending"}
          pagination={state.pagination}
          onChangePage={handleTablePageChange}
          onChangeRowsPerPage={handleChangeTableRowsPerPage}
          onOrderChange={handleTableOrderChange}
          onRowDelete={deteleBanner}
          onRowEdit={handleClickRowEdit}
        />
        <AddBannerDialog
          isOpened={state.isOpenedAddFormDialog}
          onClose={() =>
            setState((state) => ({ ...state, isOpenedAddFormDialog: false }))
          }
          onSubmit={createBanner}
        />
        {state.modifyingBanner && (
          <EditBannerDialog
            data={state.modifyingBanner}
            isOpened={state.isOpenedEditFormDialog}
            onClose={() =>
              setState((state) => ({ ...state, isOpenedEditFormDialog: false }))
            }
            onSubmit={updateBanner}
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

function a11yProps(index: number) {
  return {
    id: `banner-type-${index}`,
    "aria-controls": `banner-tabpanel-${index}`,
  }
}

const mapTabNumberToBannerStatus: Record<number, Banner["status"]> = {
  0: "active",
  1: "unactive",
  2: "waiting",
}
