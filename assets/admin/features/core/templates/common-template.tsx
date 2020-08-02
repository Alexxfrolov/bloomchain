import React, {
  cloneElement,
  useState,
  useCallback,
  ReactElement,
  ReactNode,
  useEffect,
} from "react"
import clsx from "clsx"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useTheme } from "@material-ui/core/styles"
import { Drawer, IconButton, makeStyles } from "@material-ui/core"
import { grey } from "@material-ui/core/colors"
import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded"

import { Header } from "../organisms"

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
    position: "fixed",
    zIndex: 10,
    left: 0,
    top: 0,
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: grey[50],
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
    maxWidth: `calc(100% - ${drawerWidth}px)`,
    minHeight: "100vh",
    overflow: "auto",
    backgroundColor: "white",
    transform: `translateX(${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentFull: {
    maxWidth: `calc(100% - ${theme.spacing(7)}px)`,
    transform: `translateX(${theme.spacing(7)}px)`,
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
  header?: ReactElement
  menu: ReactElement
}

export const CommonTemplate = ({
  children,
  header = <Header openedDrawer={false} onDrawerClose={() => {}} />,
  menu,
}: CommonTemplateProps) => {
  const classes = useStyles()
  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"))

  const [isOpened, setOpened] = useState(isSmallDevice)

  useEffect(() => {
    isSmallDevice ? setOpened(false) : setOpened(true)
  }, [isSmallDevice])

  const handleDrawerOpen = useCallback(() => {
    setOpened(true)
  }, [setOpened])

  const handleDrawerClose = useCallback(() => {
    setOpened(false)
  }, [setOpened])

  return (
    <div className={classes.root}>
      {cloneElement(header, {
        openedDrawer: isOpened,
        onDrawerClose: handleDrawerOpen,
      })}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !isOpened && classes.drawerPaperClose,
          ),
        }}
        open={isOpened}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <MenuOpenRoundedIcon />
          </IconButton>
        </div>
        {cloneElement(menu, {
          openedDrawer: isOpened,
        })}
      </Drawer>
      <main className={clsx(classes.content, !isOpened && classes.contentFull)}>
        {children}
      </main>
    </div>
  )
}
