import React from "react"
import {
  makeStyles,
  createStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  Grid,
  IconButton,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import { ConditionalList } from "@ui"
import { MediaFile } from "@api/media"

const useStyles = makeStyles((theme) =>
  createStyles({
    gridList: {
      width: "100%",
    },
    titleBar: {
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
        "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
      transition: theme.transitions.create("color", {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.standard,
      }),
      "&:hover": {
        color: "rgba(255, 255, 255)",
      },
    },
  }),
)

type MediaListProps = {
  cols?: number
  media: MediaFile[]
  onDelete: (media: MediaFile) => void
  onEdit: (media: MediaFile) => void
}

export const MediaList = ({
  cols = 3,
  media,
  onDelete,
  onEdit,
}: MediaListProps) => {
  const classes = useStyles()

  return (
    <ConditionalList
      list={media}
      renderExists={(list) => (
        <GridList
          cellHeight={300}
          className={classes.gridList}
          style={{
            height: media.length > 10 ? "900px" : "600px",
          }}
          cols={cols}
        >
          {list.map((item) => (
            <GridListTile key={item.id}>
              {item.type === "image" ? (
                <img src={item.url} alt={item.title ?? ""} />
              ) : (
                <object
                  type="application/pdf"
                  width="100%"
                  height="100%"
                  data={item.url}
                ></object>
              )}
              <GridListTileBar
                titlePosition="bottom"
                title={item.title ?? ""}
                subtitle={<span>{item.source}</span>}
                actionPosition="right"
                actionIcon={
                  <Grid container={true}>
                    {item.type !== "pdf" && (
                      <Grid item={true}>
                        <IconButton
                          className={classes.icon}
                          onClick={() => onEdit(item)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Grid>
                    )}
                    <Grid item={true}>
                      <IconButton
                        className={classes.icon}
                        onClick={() => onDelete(item)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                }
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
      )}
    />
  )
}
