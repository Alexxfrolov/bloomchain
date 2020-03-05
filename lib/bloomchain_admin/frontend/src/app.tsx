import React, { Fragment } from "react"
// import { hot } from "react-hot-loader"
import { State } from "router5"
import { useRoute } from "react-router5"
import CssBaseline from "@material-ui/core/CssBaseline"
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
import { CommonTemplate, MainMenu } from "@features/core"
import { AccountLoader } from "@features/account"

export const App = () => {
  const { route } = useRoute()

  const setPageByRoute = (route: State) => {
    if (typeof route === "undefined" || route === null || !("name" in route)) {
      return null
    }

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
  }

  return (
    <Fragment>
      <CssBaseline />
      <AccountLoader>
        <CommonTemplate menu={<MainMenu />}>
          {setPageByRoute(route)}
        </CommonTemplate>
      </AccountLoader>
    </Fragment>
  )
}
