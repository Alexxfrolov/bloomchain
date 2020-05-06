import React, { Fragment, memo, useCallback } from "react"
import { useRoute } from "react-router5"
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
} from "@material-ui/core"
import { indigo } from "@material-ui/core/colors"
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded"
import GroupRoundedIcon from "@material-ui/icons/GroupRounded"
import ArchiveRoundedIcon from "@material-ui/icons/ArchiveRounded"
import PermMediaRoundedIcon from "@material-ui/icons/PermMediaRounded"
import LabelRoundedIcon from "@material-ui/icons/LabelRounded"
import DraftsRoundedIcon from "@material-ui/icons/DraftsRounded"
import InsertDriveFileRoundedIcon from "@material-ui/icons/InsertDriveFileRounded"
import ImportContactsRoundedIcon from "@material-ui/icons/ImportContactsRounded"
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail"
import FaceRoundedIcon from "@material-ui/icons/FaceRounded"
import { RouterLink, useCurrentUser } from "@features/core"

const useStyles = makeStyles((theme) => ({
  listitem: {
    padding: 0,
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
    padding: "8px 16px",
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

export const MainMenu = memo(function MainMenu() {
  const { user } = useCurrentUser()
  const { router } = useRoute()
  const classes = useStyles()

  const isCurrentMenu = useCallback(
    (routeName, routeParams = {}) =>
      router.isActive(routeName, routeParams, true, true),
    [router],
  )

  return (
    <Fragment>
      <Divider />
      <List>
        <ListSubheader inset={true}>Публикации</ListSubheader>
        <ListItem
          aria-current={
            isCurrentMenu("admin.articles.create") ||
            isCurrentMenu("admin.articles")
              ? "page"
              : undefined
          }
          className={classes.listitem}
        >
          <RouterLink
            routeName="admin.articles"
            title="Создать"
            className={classes.link}
          >
            <ListItemIcon style={{ paddingLeft: "7px" }}>
              <DescriptionRoundedIcon
                style={{ color: indigo[500] }}
                titleAccess="Создать"
              />
            </ListItemIcon>
            <ListItemText primary="Создать" />
          </RouterLink>
        </ListItem>
        <ListItem
          aria-current={
            isCurrentMenu("admin.articles.draft") ? "page" : undefined
          }
          className={classes.listitem}
        >
          <RouterLink
            routeName="admin.articles.draft"
            title="Черновик"
            className={classes.link}
          >
            <ListItemIcon style={{ paddingLeft: "7px" }}>
              <DraftsRoundedIcon style={{ color: indigo[500] }} />
            </ListItemIcon>
            <ListItemText primary="Черновик" />
          </RouterLink>
        </ListItem>
        <ListItem
          aria-current={
            isCurrentMenu("admin.articles.ready") ? "page" : undefined
          }
          className={classes.listitem}
        >
          <RouterLink
            routeName="admin.articles.ready"
            title="Готово к публикации"
            className={classes.link}
          >
            <ListItemIcon style={{ paddingLeft: "7px" }}>
              <InsertDriveFileRoundedIcon style={{ color: indigo[500] }} />
            </ListItemIcon>
            <ListItemText primary="Готово к публикации" />
          </RouterLink>
        </ListItem>
        <ListItem
          aria-current={
            isCurrentMenu("admin.articles.published") ? "page" : undefined
          }
          className={classes.listitem}
        >
          <RouterLink
            routeName="admin.articles.published"
            title="Опубликовано"
            className={classes.link}
          >
            <ListItemIcon style={{ paddingLeft: "7px" }}>
              <DescriptionRoundedIcon style={{ color: indigo[500] }} />
            </ListItemIcon>
            <ListItemText primary="Опубликовано" />
          </RouterLink>
        </ListItem>
        <ListItem
          aria-current={
            isCurrentMenu("admin.articles.archive") ? "page" : undefined
          }
          className={classes.listitem}
        >
          <RouterLink
            routeName="admin.articles.archive"
            title="Архив"
            className={classes.link}
          >
            <ListItemIcon style={{ paddingLeft: "7px" }}>
              <ArchiveRoundedIcon style={{ color: indigo[500] }} />
            </ListItemIcon>
            <ListItemText primary="Архив" />
          </RouterLink>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListSubheader inset={true}>Страницы</ListSubheader>
        <ListItem
          aria-current={isCurrentMenu("admin.archives") ? "page" : undefined}
          className={classes.listitem}
        >
          <RouterLink
            routeName="admin.archives"
            title="Исследования Архив"
            className={classes.link}
          >
            <ListItemIcon style={{ paddingLeft: "7px" }}>
              <ImportContactsRoundedIcon style={{ color: indigo[500] }} />
            </ListItemIcon>
            <ListItemText primary="Исследования (архив)" />
          </RouterLink>
        </ListItem>
      </List>
      <Divider />
      {user.role === "admin" && (
        <List>
          <ListSubheader inset={true}>Управление</ListSubheader>
          <ListItem
            aria-current={isCurrentMenu("admin.users") ? "page" : undefined}
            className={classes.listitem}
          >
            <RouterLink
              routeName="admin.users"
              title="Пользователи"
              className={classes.link}
            >
              <ListItemIcon style={{ paddingLeft: "7px" }}>
                <GroupRoundedIcon style={{ color: indigo[500] }} />
              </ListItemIcon>
              <ListItemText primary="Пользователи" />
            </RouterLink>
          </ListItem>
          <ListItem
            aria-current={
              isCurrentMenu("admin.subscribers") ? "page" : undefined
            }
            className={classes.listitem}
          >
            <RouterLink
              routeName="admin.subscribers"
              title="Подписчики"
              className={classes.link}
            >
              <ListItemIcon style={{ paddingLeft: "7px" }}>
                <AlternateEmailIcon style={{ color: indigo[500] }} />
              </ListItemIcon>
              <ListItemText primary="Подписчики" />
            </RouterLink>
          </ListItem>
        </List>
      )}
      <Divider />
      <List>
        <ListSubheader inset={true}>Словари</ListSubheader>
        <ListItem
          aria-current={isCurrentMenu("admin.authors") ? "page" : undefined}
          className={classes.listitem}
        >
          <RouterLink
            routeName="admin.authors"
            title="Авторы"
            className={classes.link}
          >
            <ListItemIcon style={{ paddingLeft: "7px" }}>
              <FaceRoundedIcon style={{ color: indigo[500] }} />
            </ListItemIcon>
            <ListItemText primary="Авторы" />
          </RouterLink>
        </ListItem>
        <ListItem
          aria-current={isCurrentMenu("admin.tags") ? "page" : undefined}
          className={classes.listitem}
        >
          <RouterLink
            routeName="admin.tags"
            title="Тэги"
            className={classes.link}
          >
            <ListItemIcon style={{ paddingLeft: "7px" }}>
              <LabelRoundedIcon style={{ color: indigo[500] }} />
            </ListItemIcon>
            <ListItemText primary="Тэги" />
          </RouterLink>
        </ListItem>
        <ListItem
          aria-current={isCurrentMenu("admin.media") ? "page" : undefined}
          className={classes.listitem}
        >
          <RouterLink
            routeName="admin.media"
            title="Медиа"
            className={classes.link}
          >
            <ListItemIcon style={{ paddingLeft: "7px" }}>
              <PermMediaRoundedIcon style={{ color: indigo[500] }} />
            </ListItemIcon>
            <ListItemText primary="Медиа" />
          </RouterLink>
        </ListItem>
      </List>
    </Fragment>
  )
})