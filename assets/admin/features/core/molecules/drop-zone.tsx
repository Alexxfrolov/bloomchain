import React, { Fragment } from "react"
import { useDropzone, DropEvent } from "react-dropzone"
import { Box, Typography, makeStyles, createStyles } from "@material-ui/core"

const MAX_FILE_SIZE = 1024 * 1024 * 50

type DropZoneProps = {
  accept?: string | string[]
  disabled?: boolean
  maxSize?: number
  title: string
  onDrop: (
    acceptedFiles: File[],
    rejectedFiles?: File[],
    event?: DropEvent,
  ) => void
}

export function DropZone(props: DropZoneProps) {
  const classes = useStyles()

  const {
    accept,
    disabled = false,
    maxSize = MAX_FILE_SIZE,
    title = "",
    onDrop,
  } = props

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    disabled,
    maxSize,
    onDrop,
  })

  return (
    <div {...getRootProps()}>
      <Box p={2} className={classes.box}>
        <input {...getInputProps()} />
        <Fragment>
          <Typography align="center" variant="subtitle1" component="p">
            <strong>{title}</strong>
          </Typography>
          <Typography align="center">(или нажмите)</Typography>
        </Fragment>
      </Box>
    </div>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    box: {
      padding: "1.25rem 0.9375rem",
      display: "block",
      fontSize: "14px",
      letterSpacing: "0.0625rem",
      lineHeight: "140%",
      textAlign: "center",
      cursor: "pointer",
      border: "2px dashed rgba(0, 0, 0, 0.12)",
      borderRadius: theme.shape.borderRadius,
      transition: theme.transitions.create("border-color", {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.standard,
      }),
      "&:hover": {
        borderColor: "rgba(0, 0, 0, 0.75)",
      },
    },
  }),
)
