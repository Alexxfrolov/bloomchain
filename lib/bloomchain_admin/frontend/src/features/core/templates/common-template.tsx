import React, { useState, useCallback, ReactElement, ReactNode } from "react"
import clsx from "clsx"
import {
  Drawer,
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core"
import MenuRoundedIcon from "@material-ui/icons/MenuRounded"
import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded"
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded"
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
}))

type CommonTemplateProps = {
  children: ReactNode
  menu: ReactElement
}

export const CommonTemplate = ({ children, menu }: CommonTemplateProps) => {
  const classes = useStyles()
  const [opened, setOpened] = useState(false)

  const handleDrawerOpen = useCallback(() => {
    setOpened(true)
  }, [setOpened])

  const handleDrawerClose = useCallback(() => {
    setOpened(false)
  }, [setOpened])

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, opened && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <Grid container={true} justify="space-between" wrap="nowrap">
            <Grid item={true}>
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
            </Grid>
            <Grid item={true} container={true} justify="flex-end">
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
          paper: clsx(classes.drawerPaper, !opened && classes.drawerPaperClose),
        }}
        open={opened}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <MenuOpenRoundedIcon />
          </IconButton>
        </div>
        {menu}
      </Drawer>
      <main className={classes.content}>{children}</main>
    </div>
  )
}
