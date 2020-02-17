import React, { Fragment, useState, useCallback } from "react"
import { hot } from "react-hot-loader"
import { State } from "router5"
import { useRoute } from "react-router5"
import clsx from "clsx"
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Grid,
  Divider,
  IconButton,
  Badge,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
} from "@material-ui/core"
import { indigo } from "@material-ui/core/colors"
import MenuRoundedIcon from "@material-ui/icons/MenuRounded"
import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded"
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded"
import NotificationsActiveRoundedIcon from "@material-ui/icons/NotificationsActiveRounded"
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded"
import GroupRoundedIcon from "@material-ui/icons/GroupRounded"
import ArchiveRoundedIcon from "@material-ui/icons/ArchiveRounded"
import PermMediaRoundedIcon from "@material-ui/icons/PermMediaRounded"
import CreateRoundedIcon from "@material-ui/icons/CreateRounded"
import LabelRoundedIcon from "@material-ui/icons/LabelRounded"
import DraftsRoundedIcon from "@material-ui/icons/DraftsRounded"
import InsertDriveFileRoundedIcon from "@material-ui/icons/InsertDriveFileRounded"
import {
  AuthorsViewPage,
  AuthorsCreatePage,
  AuthorsEditPage,
  MediaPage,
  TagsViewPage,
  TagsCreatePage,
  TagsEditPage,
  ActiclesArchivePage,
  ActicleCreatePage,
  ArticlesDraftPage,
  ArticlesPublishedPage,
  ArticlesReadyPage,
  UsersViewPage,
  UserCreatePage,
  UserEditPage,
  UserAccountPage,
} from "@pages"
import { NavLink } from "@lib/navlink"

const drawerWidth = 260

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    textAlign: "left",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  listitem: {
    transition: theme.transitions.create("background-color", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.standard,
    }),
    "&:hover": {
      backgroundColor: indigo[200],
    },
    "&[aria-current=page]": {
      backgroundColor: indigo[500],

      "& a": {
        color: "white",
      },

      "& svg": {
        fill: "white",
      },
    },
  },
  link: {
    display: "flex",
    width: "100%",
    color: "rgba(0, 0, 0, 0.87)",
    textDecoration: "none",
    alignItems: "center",
  },
  content: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(5),
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}))

export const App = hot(module)(function App() {
  const classes = useStyles()
  const { route, router } = useRoute()

  const isCurrentMenu = useCallback(
    (routeName, routeParams = {}) =>
      router.isActive(routeName, routeParams, false, false),
    [router.isActive],
  )

  const [opened, setOpened] = useState(true)

  const handleDrawerOpen = useCallback(() => {
    setOpened(true)
  }, [setOpened])

  const handleDrawerClose = useCallback(() => {
    setOpened(false)
  }, [setOpened])

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
        return <ArticlesReadyPage />
      case "admin.articles.draft":
        return <ArticlesDraftPage />
      case "admin.articles.published":
        return <ArticlesPublishedPage />
      case "admin.articles.archive":
        return <ActiclesArchivePage />
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
      case "admin.management.users":
        return <UsersViewPage />
      case "admin.management.users.create":
        return <UserCreatePage />
      case "admin.management.users.edit":
        return <UserEditPage />
      default:
        return null
    }
  }

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, opened && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <Grid container={true} justify="space-between">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  opened && classes.menuButtonHidden,
                )}
              >
                <MenuRoundedIcon />
              </IconButton>
              <Grid item={true} container={true} justify="flex-end">
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsActiveRoundedIcon />
                  </Badge>
                </IconButton>
                <NavLink routeName="admin.account">
                  <IconButton color="inherit">
                    <AccountCircleRoundedIcon htmlColor="white" />
                  </IconButton>
                </NavLink>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(
              classes.drawerPaper,
              !opened && classes.drawerPaperClose,
            ),
          }}
          open={opened}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <MenuOpenRoundedIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListSubheader inset={true}>Публикации</ListSubheader>
            <ListItem
              aria-current={
                isCurrentMenu("admin.articles.create") ? "page" : undefined
              }
              className={classes.listitem}
            >
              <NavLink routeName="admin.articles" className={classes.link}>
                <ListItemIcon style={{ paddingLeft: "7px" }}>
                  <DescriptionRoundedIcon style={{ color: indigo[500] }} />
                </ListItemIcon>
                <ListItemText primary="Создать" />
              </NavLink>
            </ListItem>
            <ListItem
              aria-current={
                isCurrentMenu("admin.articles.draft") ? "page" : undefined
              }
              className={classes.listitem}
            >
              <NavLink
                routeName="admin.articles.draft"
                className={classes.link}
              >
                <ListItemIcon style={{ paddingLeft: "7px" }}>
                  <DraftsRoundedIcon style={{ color: indigo[500] }} />
                </ListItemIcon>
                <ListItemText primary="Черновик" />
              </NavLink>
            </ListItem>
            <ListItem
              aria-current={
                isCurrentMenu("admin.articles.ready") ? "page" : undefined
              }
              className={classes.listitem}
            >
              <NavLink
                routeName="admin.articles.ready"
                className={classes.link}
              >
                <ListItemIcon style={{ paddingLeft: "7px" }}>
                  <InsertDriveFileRoundedIcon style={{ color: indigo[500] }} />
                </ListItemIcon>
                <ListItemText primary="Готово к публикации" />
              </NavLink>
            </ListItem>
            <ListItem
              aria-current={
                isCurrentMenu("admin.articles.published") ? "page" : undefined
              }
              className={classes.listitem}
            >
              <NavLink
                routeName="admin.articles.published"
                className={classes.link}
              >
                <ListItemIcon style={{ paddingLeft: "7px" }}>
                  <DescriptionRoundedIcon style={{ color: indigo[500] }} />
                </ListItemIcon>
                <ListItemText primary="Опубликовано" />
              </NavLink>
            </ListItem>
            <ListItem
              aria-current={
                isCurrentMenu("admin.articles.archive") ? "page" : undefined
              }
              className={classes.listitem}
            >
              <NavLink
                routeName="admin.articles.archive"
                className={classes.link}
              >
                <ListItemIcon style={{ paddingLeft: "7px" }}>
                  <ArchiveRoundedIcon style={{ color: indigo[500] }} />
                </ListItemIcon>
                <ListItemText primary="Архив" />
              </NavLink>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListSubheader inset={true}>Управление</ListSubheader>
            <ListItem
              aria-current={
                isCurrentMenu("admin.management.users") ? "page" : undefined
              }
              className={classes.listitem}
            >
              <NavLink
                routeName="admin.management.users"
                className={classes.link}
              >
                <ListItemIcon style={{ paddingLeft: "7px" }}>
                  <GroupRoundedIcon style={{ color: indigo[500] }} />
                </ListItemIcon>
                <ListItemText primary="Пользователи" />
              </NavLink>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListSubheader inset={true}>Словари</ListSubheader>
            <ListItem
              aria-current={
                isCurrentMenu("admin.dictionaries.authors") ? "page" : undefined
              }
              className={classes.listitem}
            >
              <NavLink
                routeName="admin.dictionaries.authors"
                className={classes.link}
              >
                <ListItemIcon style={{ paddingLeft: "7px" }}>
                  <CreateRoundedIcon style={{ color: indigo[500] }} />
                </ListItemIcon>
                <ListItemText primary="Авторы" />
              </NavLink>
            </ListItem>
            <ListItem
              aria-current={
                isCurrentMenu("admin.dictionaries.tags") ? "page" : undefined
              }
              className={classes.listitem}
            >
              <NavLink
                routeName="admin.dictionaries.tags"
                className={classes.link}
              >
                <ListItemIcon style={{ paddingLeft: "7px" }}>
                  <LabelRoundedIcon style={{ color: indigo[500] }} />
                </ListItemIcon>
                <ListItemText primary="Тэги" />
              </NavLink>
            </ListItem>
            <ListItem
              aria-current={
                isCurrentMenu("admin.dictionaries.media") ? "page" : undefined
              }
              className={classes.listitem}
            >
              <NavLink
                routeName="admin.dictionaries.media"
                className={classes.link}
              >
                <ListItemIcon style={{ paddingLeft: "7px" }}>
                  <PermMediaRoundedIcon style={{ color: indigo[500] }} />
                </ListItemIcon>
                <ListItemText primary="Медиа" />
              </NavLink>
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>{setPageByRoute(route)}</main>
      </div>
    </Fragment>
  )
})
