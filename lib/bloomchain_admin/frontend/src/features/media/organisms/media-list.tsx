import React, { memo, Fragment, useCallback, ChangeEvent } from "react"
import {
  makeStyles,
  createStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  ButtonGroup,
  Box,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import Pagination from "@material-ui/lab/Pagination"
import { Pagination as IPagination } from "@api/common/types"
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
  pagination: IPagination
  onDelete: (media: MediaFile) => void
  onEdit: (media: MediaFile) => void
  onChangePaginationPage: (page: number) => void
}

export const MediaList = memo(function (props: MediaListProps) {
  const classes = useStyles()
  const {
    cols = 3,
    media,
    pagination,
    onDelete,
    onEdit,
    onChangePaginationPage,
  } = props

  const handleChangePagination = useCallback(
    (_event: ChangeEvent<unknown>, page: number) => {
      onChangePaginationPage(page)
    },
    [onChangePaginationPage],
  )

  return (
    <Fragment>
      <GridList
        cellHeight={300}
        className={classes.gridList}
        style={{
          height: media.length > 10 ? "900px" : "600px",
        }}
        cols={cols}
      >
        {media.map((item) => (
          <GridListTile key={item.id}>
            {item.type === "image" ? (
              <img src={item.url} alt={item.title ?? ""} />
            ) : (
              <object
                type="application/pdf"
                width="100%"
                height="100%"
                data={item.url}
                aria-label={item.alt ?? item.title ?? item.source ?? "pdf"}
              ></object>
            )}
            <GridListTileBar
              titlePosition="bottom"
              title={item.title ?? ""}
              subtitle={<span>{item.source}</span>}
              actionPosition="right"
              actionIcon={
                <ButtonGroup>
                  {item.type !== "pdf" && (
                    <IconButton
                      className={classes.icon}
                      onClick={() => onEdit(item)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton
                    className={classes.icon}
                    onClick={() => onDelete(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ButtonGroup>
              }
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
      <Box m={3}>
        <Pagination
          page={pagination.page}
          count={pagination.total_pages}
          onChange={handleChangePagination}
          color="primary"
          showFirstButton={true}
          showLastButton={true}
        />
      </Box>
    </Fragment>
  )
})
