import React, { memo, useCallback } from "react"
import clsx from "clsx"
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Link,
  Typography,
  Tooltip,
  makeStyles,
} from "@material-ui/core"
import MenuRoundedIcon from "@material-ui/icons/MenuRounded"
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded"
import HomeRoundedIcon from "@material-ui/icons/HomeRounded"
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded"
import { sessionApi } from "@api/session"
import { RouterLink } from "@features/core"

const drawerWidth = 260

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24,
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
  link: {
    display: "flex",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    "& * + *": {
      marginLeft: "0.625rem",
    },
  },
}))

type HeaderProps = {
  openedDrawer: boolean
  onDrawerClose: () => void
}

export const Header = memo(function Header(props: HeaderProps) {
  const { openedDrawer, onDrawerClose } = props
  const classes = useStyles()

  const signOut = useCallback(async () => {
    const response = await sessionApi.drop()
    if (response.status === 204) {
      window.location.assign("/session/new")
    }
  }, [])

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, openedDrawer && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <Grid container={true} justify="space-between" wrap="nowrap">
          <Grid item={true}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerClose}
              className={clsx(
                classes.menuButton,
                openedDrawer && classes.menuButtonHidden,
              )}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Grid>
          <Grid
            item={true}
            container={true}
            justify="space-between"
            alignItems="center"
          >
            <Grid item={true}>
              <Link href="/" target="_blank" className={classes.link}>
                <Tooltip title="Вернуться на сайт">
                  <IconButton color="inherit">
                    <HomeRoundedIcon color="inherit" />
                  </IconButton>
                </Tooltip>
              </Link>
            </Grid>
            <Grid item={true}>
              <RouterLink routeName="admin.account">
                <Tooltip title="Личный кабинет">
                  <IconButton color="inherit">
                    <AccountCircleRoundedIcon htmlColor="white" />
                  </IconButton>
                </Tooltip>
              </RouterLink>
              <Tooltip title="Выйти">
                <IconButton color="inherit" onClick={signOut}>
                  <ExitToAppRoundedIcon htmlColor="white" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
})
