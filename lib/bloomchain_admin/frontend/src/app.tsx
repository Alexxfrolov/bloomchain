import React, { Fragment } from "react"
import { hot } from "react-hot-loader"
import { State } from "router5"
import { useRoute } from "react-router5"
import CssBaseline from "@material-ui/core/CssBaseline"
import {
  ActicleCreatePage,
  ActicleEditPage,
  ArticlesViewPage,
  AuthorsCreatePage,
  AuthorsEditPage,
  AuthorsViewPage,
  MediaPage,
  ResearchPage,
  SubscribersPage,
  TagsCreatePage,
  TagsEditPage,
  TagsViewPage,
  UserAccountPage,
  UserCreatePage,
  UserEditPage,
  UsersViewPage,
} from "@pages"
import { CommonTemplate, MenuList } from "@features/core"

export const App = hot(module)(function App() {
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
      case "admin.dictionaries.authors":
        return <AuthorsViewPage />
      case "admin.dictionaries.authors.create":
        return <AuthorsCreatePage />
      case "admin.dictionaries.authors.edit":
        return <AuthorsEditPage />
      case "admin.dictionaries.tags":
        return <TagsViewPage />
      case "admin.dictionaries.tags.create":
        return <TagsCreatePage />
      case "admin.dictionaries.tags.edit":
        return <TagsEditPage />
      case "admin.dictionaries.media":
        return <MediaPage />
      case "admin.dictionaries.research":
        return <ResearchPage />
      case "admin.management.users":
        return <UsersViewPage />
      case "admin.management.users.create":
        return <UserCreatePage />
      case "admin.management.users.edit":
        return <UserEditPage />
      case "admin.management.subscribers":
        return <SubscribersPage />
      default:
        return null
    }
  }

  return (
    <Fragment>
      <CssBaseline />
      <CommonTemplate menu={<MenuList />}>
        {setPageByRoute(route)}
      </CommonTemplate>
    </Fragment>
  )
})
