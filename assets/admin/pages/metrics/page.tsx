import React, {
  useEffect,
  useState,
  useCallback,
  FormEvent,
  ChangeEvent,
} from "react"
import {
  AppBar,
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { ru } from "date-fns/locale"
import { metricsApi } from "@api/metrics"
import type { Metrics, MetricsParams } from "@api/metrics"
import type { Banner } from "@api/banners"
import { MetricsTable } from "@features/metrics"
import { mapTabNumberToBannerStatus } from "@features/banners"
import type { RequestStatus } from "@features/core"

type MetricsPageState = {
  request_status: RequestStatus
  error: string | null
  data: { metrics: Metrics; banner: Banner }[]
  tabIndex: number
} & Omit<MetricsParams, "status">

export function MetricsPage() {
  const [state, setState] = useState<MetricsPageState>({
    request_status: "pending",
    error: null,
    data: [],
    since: null,
    until: null,
    tabIndex: 0,
  })

  useEffect(() => {
    const params = {
      status: mapTabNumberToBannerStatus[state.tabIndex] as Exclude<
        Banner["status"],
        "waiting"
      >,
    } as const

    metricsApi
      .get(params)
      .then(({ data: { data } }) =>
        setState((state) => ({
          ...state,
          data,
          error: null,
          request_status: "success",
        })),
      )
      .catch((error) =>
        setState((state) => ({ ...state, error, request_status: "error" })),
      )
  }, [state.tabIndex])

  const handleDateChange = useCallback(
    (field: "since" | "until") => (date: Date | null) => {
      setState((state) => ({
        ...state,
        [field]: date,
      }))
    },
    [],
  )

  const handleChangeTabs = (_event: ChangeEvent<{}>, tabIndex: number) => {
    setState((state) => ({ ...state, tabIndex }))
  }

  const doFilter = useCallback(
    (event: FormEvent) => {
      event.preventDefault()

      const params = {
        since: state.since,
        until: state.until,
        status: mapTabNumberToBannerStatus[state.tabIndex] as Exclude<
          Banner["status"],
          "waiting"
        >,
      } as const

      metricsApi
        .get(params)
        .then(({ data: { data } }) =>
          setState((state) => ({
            ...state,
            data,
            error: null,
            request_status: "success",
          })),
        )
        .catch((error) =>
          setState((state) => ({ ...state, error, request_status: "error" })),
        )
    },
    [state.since, state.until, state.tabIndex],
  )

  return (
    <Container maxWidth="lg">
      <Paper>
        <Toolbar>
          <Typography component="h1" variant="h5">
            Метрики
          </Typography>
        </Toolbar>
        <Toolbar style={{ marginBottom: "20px" }}>
          <form onSubmit={doFilter} style={{ width: "100%" }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
              <Grid container={true} spacing={2}>
                <Grid item={true}>
                  <DatePicker
                    name="since"
                    disableToolbar={true}
                    variant="dialog"
                    margin="none"
                    inputVariant="outlined"
                    size="small"
                    label="Дата с"
                    format="dd/MM/yyyy"
                    value={state.since}
                    onChange={handleDateChange("since")}
                  />
                </Grid>
                <Grid item={true}>
                  <DatePicker
                    name="until"
                    disableToolbar={true}
                    variant="dialog"
                    margin="none"
                    inputVariant="outlined"
                    size="small"
                    label="Дата по"
                    format="dd/MM/yyyy"
                    value={state.until}
                    onChange={handleDateChange("until")}
                  />
                </Grid>
                <Grid item={true} style={{ display: "flex" }}>
                  <Button type="submit" variant="contained" color="primary">
                    Показать
                  </Button>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </form>
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
            <Tab label="Активные баннеры" {...a11yProps(0)} />
            <Tab label="Неактивные баннеры" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <MetricsTable
          data={state.data}
          isLoading={state.request_status === "pending"}
        />
      </Paper>
    </Container>
  )
}

function a11yProps(index: number) {
  return {
    id: `banner-metrics-${index}`,
    "aria-controls": `banner-metrics-tabpanel-${index}`,
  }
}
