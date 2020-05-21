import React, { useCallback } from "react"
import { useRoute } from "react-router5"
import { SnackbarProvider } from "notistack"
import CssBaseline from "@material-ui/core/CssBaseline"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import { ruRU } from "@material-ui/core/locale"
import {
  ActicleCreatePage,
  ActicleEditPage,
  ArchivesPage,
  ArticlesViewPage,
  AuthorsPage,
  MediaPage,
  SubscribersPage,
  TagsPage,
  UserAccountPage,
  UsersPage,
} from "@pages"
import {
  CommonTemplate,
  UserProvider,
  MainMenu,
  CloseNotifications,
} from "@features/core"

const theme = createMuiTheme({}, ruRU)

export const App = () => {
  const { route } = useRoute()

  const setPageByRoute = useCallback(() => {
    switch (route.name) {
      case "admin.account":
        return <UserAccountPage />
      case "admin":
      case "admin.articles":
        return <ActicleCreatePage />
      case "admin.articles.ready":
      case "admin.articles.draft":
      case "admin.articles.published":
      case "admin.articles.archive":
        return <ArticlesViewPage />
      case "admin.articles.edit":
        return <ActicleEditPage />
      case "admin.authors":
        return <AuthorsPage />
      case "admin.tags":
        return <TagsPage />
      case "admin.media":
        return <MediaPage />
      case "admin.archives":
        return <ArchivesPage />
      case "admin.users":
        return <UsersPage />
      case "admin.subscribers":
        return <SubscribersPage />
      default:
        return null
    }
  }, [route.name])

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        hideIconVariant={true}
        preventDuplicate={true}
        maxSnack={10}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        action={(key) => <CloseNotifications notificationKey={key} />}
      >
        <CssBaseline />
        <UserProvider>
          <CommonTemplate menu={<MainMenu openedDrawer={false} />}>
            {setPageByRoute()}
          </CommonTemplate>
        </UserProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
