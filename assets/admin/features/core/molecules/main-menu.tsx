import React, { Fragment, memo, useCallback } from "react"
import { useRoute } from "react-router5"
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
  makeStyles,
} from "@material-ui/core"
import { indigo } from "@material-ui/core/colors"
import CreateRoundedIcon from "@material-ui/icons/CreateRounded"
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded"
import GroupRoundedIcon from "@material-ui/icons/GroupRounded"
import ArchiveRoundedIcon from "@material-ui/icons/ArchiveRounded"
import PermMediaRoundedIcon from "@material-ui/icons/PermMediaRounded"
import LabelRoundedIcon from "@material-ui/icons/LabelRounded"
import DraftsRoundedIcon from "@material-ui/icons/DraftsRounded"
import InsertDriveFileRoundedIcon from "@material-ui/icons/InsertDriveFileRounded"
import ImportContactsRoundedIcon from "@material-ui/icons/ImportContactsRounded"
import PollRoundedIcon from "@material-ui/icons/PollRounded"
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail"
import OpenInNewRoundedIcon from "@material-ui/icons/OpenInNewRounded"
import FaceRoundedIcon from "@material-ui/icons/FaceRounded"
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded"
import AssessmentRoundedIcon from "@material-ui/icons/AssessmentRounded"
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

type MainMenuProps = {
  openedDrawer: boolean
}

export const MainMenu = memo(function MainMenu(props: MainMenuProps) {
  const { user } = useCurrentUser()
  const { router } = useRoute()
  const classes = useStyles()
  const { openedDrawer } = props

  const isCurrentMenu = useCallback(
    (routeName, routeParams = {}) =>
      router.isActive(routeName, routeParams, true, true),
    [router],
  )

  return (
    <Fragment>
      <Divider />
      <List>
        {openedDrawer && (
          <ListSubheader inset={true} disableSticky={true}>
            Публикации
          </ListSubheader>
        )}
        <Tooltip title={openedDrawer ? "" : "Создать статью"}>
          <ListItem
            aria-current={
              isCurrentMenu("admin.articles.create") ||
              isCurrentMenu("admin.articles") ||
              isCurrentMenu("admin")
                ? "page"
                : undefined
            }
            className={classes.listitem}
          >
            <RouterLink routeName="admin.articles" className={classes.link}>
              <ListItemIcon style={{ paddingLeft: "7px" }}>
                <CreateRoundedIcon
                  style={{ color: indigo[500] }}
                  titleAccess="Создать"
                />
              </ListItemIcon>
              <ListItemText primary="Создать" />
            </RouterLink>
          </ListItem>
        </Tooltip>
        <Tooltip title={openedDrawer ? "" : "Опубликовано"}>
          <ListItem
            aria-current={
              isCurrentMenu("admin.articles.published") ? "page" : undefined
            }
            className={classes.listitem}
          >
            <RouterLink
              routeName="admin.articles.published"
              className={classes.link}
            >
              <ListItemIcon style={{ paddingLeft: "7px" }}>
                <DescriptionRoundedIcon style={{ color: indigo[500] }} />
              </ListItemIcon>
              <ListItemText primary="Опубликовано" />
            </RouterLink>
          </ListItem>
        </Tooltip>
        <Tooltip title={openedDrawer ? "" : "Готово к публикации"}>
          <ListItem
            aria-current={
              isCurrentMenu("admin.articles.ready") ? "page" : undefined
            }
            className={classes.listitem}
          >
            <RouterLink
              routeName="admin.articles.ready"
              className={classes.link}
            >
              <ListItemIcon style={{ paddingLeft: "7px" }}>
                <InsertDriveFileRoundedIcon style={{ color: indigo[500] }} />
              </ListItemIcon>
              <ListItemText primary="Готово к публикации" />
            </RouterLink>
          </ListItem>
        </Tooltip>
        <Tooltip title={openedDrawer ? "" : "Черновик"}>
          <ListItem
            aria-current={
              isCurrentMenu("admin.articles.draft") ? "page" : undefined
            }
            className={classes.listitem}
          >
            <RouterLink
              routeName="admin.articles.draft"
              className={classes.link}
            >
              <ListItemIcon style={{ paddingLeft: "7px" }}>
                <DraftsRoundedIcon style={{ color: indigo[500] }} />
              </ListItemIcon>
              <ListItemText primary="Черновик" />
            </RouterLink>
          </ListItem>
        </Tooltip>
        <Tooltip title={openedDrawer ? "" : "Архив"}>
          <ListItem
            aria-current={
              isCurrentMenu("admin.articles.archive") ? "page" : undefined
            }
            className={classes.listitem}
          >
            <RouterLink
              routeName="admin.articles.archive"
              className={classes.link}
            >
              <ListItemIcon style={{ paddingLeft: "7px" }}>
                <ArchiveRoundedIcon style={{ color: indigo[500] }} />
              </ListItemIcon>
              <ListItemText primary="Архив" />
            </RouterLink>
          </ListItem>
        </Tooltip>
      </List>
      <Divider />
      <List>
        {openedDrawer && (
          <ListSubheader inset={true} disableSticky={true}>
            Страницы
          </ListSubheader>
        )}
        <Tooltip title={openedDrawer ? "" : "Все разделы"}>
          <ListItem
            aria-current={isCurrentMenu("admin.sections") ? "page" : undefined}
            className={classes.listitem}
          >
            <RouterLink routeName="admin.sections" className={classes.link}>
              <ListItemIcon style={{ paddingLeft: "7px" }}>
                <ImportContactsRoundedIcon style={{ color: indigo[500] }} />
              </ListItemIcon>
              <ListItemText primary="Все разделы" />
            </RouterLink>
          </ListItem>
        </Tooltip>
        <Tooltip title={openedDrawer ? "" : "Исследования Архив"}>
          <ListItem
            aria-current={isCurrentMenu("admin.archives") ? "page" : undefined}
            className={classes.listitem}
          >
            <RouterLink routeName="admin.archives" className={classes.link}>
              <ListItemIcon style={{ paddingLeft: "7px" }}>
                <PollRoundedIcon style={{ color: indigo[500] }} />
              </ListItemIcon>
              <ListItemText primary="Исследования (архив)" />
            </RouterLink>
          </ListItem>
        </Tooltip>
      </List>
      <Divider />
      {user && user.role === "admin" && (
        <List>
          {openedDrawer && (
            <ListSubheader inset={true} disableSticky={true}>
              Управление
            </ListSubheader>
          )}
          <Tooltip title={openedDrawer ? "" : "Пользователи"}>
            <ListItem
              aria-current={isCurrentMenu("admin.users") ? "page" : undefined}
              className={classes.listitem}
            >
              <RouterLink routeName="admin.users" className={classes.link}>
                <ListItemIcon style={{ paddingLeft: "7px" }}>
                  <GroupRoundedIcon style={{ color: indigo[500] }} />
                </ListItemIcon>
                <ListItemText primary="Пользователи" />
              </RouterLink>
            </ListItem>
          </Tooltip>
          <Tooltip title={openedDrawer ? "" : "Подписчики"}>
            <ListItem
              aria-current={
                isCurrentMenu("admin.subscribers") ? "page" : undefined
              }
              className={classes.listitem}
            >
              <RouterLink
                routeName="admin.subscribers"
                className={classes.link}
              >
                <ListItemIcon style={{ paddingLeft: "7px" }}>
                  <AlternateEmailIcon style={{ color: indigo[500] }} />
                </ListItemIcon>
                <ListItemText primary="Подписчики" />
              </RouterLink>
            </ListItem>
          </Tooltip>
          <Tooltip title={openedDrawer ? "" : "Редиректы"}>
            <ListItem
              aria-current={
                isCurrentMenu("admin.redirects") ? "page" : undefined
              }
              className={classes.listitem}
            >
              <RouterLink routeName="admin.redirects" className={classes.link}>
                <ListItemIcon style={{ paddingLeft: "7px" }}>
                  <OpenInNewRoundedIcon style={{ color: indigo[500] }} />
                </ListItemIcon>
                <ListItemText primary="Редиректы" />
              </RouterLink>
            </ListItem>
          </Tooltip>
        </List>
      )}
      <Divider />
      <List>
        {openedDrawer && (
          <ListSubheader inset={true} disableSticky={true}>
            Словари
          </ListSubheader>
        )}
        <Tooltip title={openedDrawer ? "" : "Авторы"}>
          <ListItem
            aria-current={isCurrentMenu("admin.authors") ? "page" : undefined}
            className={classes.listitem}
          >
            <RouterLink routeName="admin.authors" className={classes.link}>
              <ListItemIcon style={{ paddingLeft: "7px" }}>
                <FaceRoundedIcon style={{ color: indigo[500] }} />
              </ListItemIcon>
              <ListItemText primary="Авторы" />
            </RouterLink>
          </ListItem>
        </Tooltip>
        <Tooltip title={openedDrawer ? "" : "Тэги"}>
          <ListItem
            aria-current={isCurrentMenu("admin.tags") ? "page" : undefined}
            className={classes.listitem}
          >
            <RouterLink routeName="admin.tags" className={classes.link}>
              <ListItemIcon style={{ paddingLeft: "7px" }}>
                <LabelRoundedIcon style={{ color: indigo[500] }} />
              </ListItemIcon>
              <ListItemText primary="Тэги" />
            </RouterLink>
          </ListItem>
        </Tooltip>
        <Tooltip title={openedDrawer ? "" : "Медиа"}>
          <ListItem
            aria-current={isCurrentMenu("admin.media") ? "page" : undefined}
            className={classes.listitem}
          >
            <RouterLink routeName="admin.media" className={classes.link}>
              <ListItemIcon style={{ paddingLeft: "7px" }}>
                <PermMediaRoundedIcon style={{ color: indigo[500] }} />
              </ListItemIcon>
              <ListItemText primary="Медиа" />
            </RouterLink>
          </ListItem>
        </Tooltip>
      </List>
      {user && user.role === "admin" && (
        <Fragment>
          <Divider />
          <List>
            {openedDrawer && (
              <ListSubheader inset={true} disableSticky={true}>
                Реклама
              </ListSubheader>
            )}
            <Tooltip title={openedDrawer ? "" : "Баннеры"}>
              <ListItem
                aria-current={
                  isCurrentMenu("admin.banners") ? "page" : undefined
                }
                className={classes.listitem}
              >
                <RouterLink routeName="admin.banners" className={classes.link}>
                  <ListItemIcon style={{ paddingLeft: "7px" }}>
                    <LocalOfferRoundedIcon style={{ color: indigo[500] }} />
                  </ListItemIcon>
                  <ListItemText primary="Баннеры" />
                </RouterLink>
              </ListItem>
            </Tooltip>
            <Tooltip title={openedDrawer ? "" : "Метрики"}>
              <ListItem
                aria-current={
                  isCurrentMenu("admin.metrics") ? "page" : undefined
                }
                className={classes.listitem}
              >
                <RouterLink routeName="admin.metrics" className={classes.link}>
                  <ListItemIcon style={{ paddingLeft: "7px" }}>
                    <AssessmentRoundedIcon style={{ color: indigo[500] }} />
                  </ListItemIcon>
                  <ListItemText primary="Метрики" />
                </RouterLink>
              </ListItem>
            </Tooltip>
          </List>
        </Fragment>
      )}
    </Fragment>
  )
})
