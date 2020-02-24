import React, { Fragment, useCallback } from "react"
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
import CreateRoundedIcon from "@material-ui/icons/CreateRounded"
import LabelRoundedIcon from "@material-ui/icons/LabelRounded"
import DraftsRoundedIcon from "@material-ui/icons/DraftsRounded"
import InsertDriveFileRoundedIcon from "@material-ui/icons/InsertDriveFileRounded"
import ImportContactsRoundedIcon from "@material-ui/icons/ImportContactsRounded"
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail"
import { NavLink } from "@lib/navlink"

const useStyles = makeStyles((theme) => ({
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

export const MenuList = () => {
  const { router } = useRoute()
  const classes = useStyles()

  const isCurrentMenu = useCallback(
    (routeName, routeParams = {}) =>
      router.isActive(routeName, routeParams, false, false),
    [router.isActive],
  )

  return (
    <Fragment>
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
          <NavLink routeName="admin.articles.draft" className={classes.link}>
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
          <NavLink routeName="admin.articles.ready" className={classes.link}>
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
          <NavLink routeName="admin.articles.archive" className={classes.link}>
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
          <NavLink routeName="admin.management.users" className={classes.link}>
            <ListItemIcon style={{ paddingLeft: "7px" }}>
              <GroupRoundedIcon style={{ color: indigo[500] }} />
            </ListItemIcon>
            <ListItemText primary="Пользователи" />
          </NavLink>
        </ListItem>
        <ListItem
          aria-current={
            isCurrentMenu("admin.management.subscribers") ? "page" : undefined
          }
          className={classes.listitem}
        >
          <NavLink
            routeName="admin.management.subscribers"
            className={classes.link}
          >
            <ListItemIcon style={{ paddingLeft: "7px" }}>
              <AlternateEmailIcon style={{ color: indigo[500] }} />
            </ListItemIcon>
            <ListItemText primary="Подписчики" />
          </NavLink>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListSubheader inset={true}>Словари</ListSubheader>
        <ListItem
          aria-current={
            isCurrentMenu("admin.dictionaries.research") ? "page" : undefined
          }
          className={classes.listitem}
        >
          <NavLink
            routeName="admin.dictionaries.research"
            className={classes.link}
          >
            <ListItemIcon style={{ paddingLeft: "7px" }}>
              <ImportContactsRoundedIcon style={{ color: indigo[500] }} />
            </ListItemIcon>
            <ListItemText primary="Исследования" />
          </NavLink>
        </ListItem>
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
          <NavLink routeName="admin.dictionaries.tags" className={classes.link}>
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
    </Fragment>
  )
}