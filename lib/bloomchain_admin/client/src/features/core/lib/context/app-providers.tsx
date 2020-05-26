import React, { ReactNode } from "react"
import { RouterProvider } from "react-router5"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import { ruRU } from "@material-ui/core/locale"
import { SnackbarProvider } from "notistack"

import { CloseNotifications } from "../../organisms"
import { router } from "../router"

import { UserProvider } from "./user-provider"

const theme = createMuiTheme({}, ruRU)

type AppProvidersProps = {
  children: ReactNode | ReactNode[]
}

export function AppProviders(props: AppProvidersProps) {
  const { children } = props

  return (
    <RouterProvider router={router}>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            hideIconVariant={true}
            preventDuplicate={true}
            maxSnack={10}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            autoHideDuration={6000}
            action={(key) => <CloseNotifications notificationKey={key} />}
          >
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </UserProvider>
    </RouterProvider>
  )
}
