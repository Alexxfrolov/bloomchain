import React, { useState, useCallback, useRef, Ref } from "react"
import {
  Tabs,
  Tab,
  ButtonGroup,
  IconButton,
  Paper,
  makeStyles,
  createStyles,
} from "@material-ui/core"
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined"
import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined"
import PermMediaOutlinedIcon from "@material-ui/icons/PermMediaOutlined"

const useStyles = makeStyles(() =>
  createStyles({
    buttonIcon: {
      borderRadius: "unset",
      '&:[aria-current="step"]': {},
    },
    input: {
      display: "none",
    },
    labelWrapper: {
      position: "relative",
      padding: "1.25rem",
    },
    label: {
      padding: "25px 0",
      display: "block",
      border: "dashed 2px #bdbdbd",
      fontSize: "14px",
      letterSpacing: "0.0625rem",
      lineHeight: "140%",
      textAlign: "center",
    },
  }),
)

type ImagesUploadFormProps = {
  accept?: string[]
}

export const ImagesUploadForm = ({ accept }: ImagesUploadFormProps) => {
  const classes = useStyles()

  const [tabIndex, setTabIndex] = useState(0)

  const imageRef: Ref<HTMLImageElement | null> = useRef(null)
  const inputFileRef: Ref<HTMLInputElement | null> = useRef(null)

  const handleChangeTab = useCallback(
    (event: ChangeEvent, newValue: number) => {
      setTabIndex(newValue)
    },
    [setTabIndex],
  )

  return (
    <Paper>
      <Tabs
        value={tabIndex}
        onChange={handleChangeTab}
        indicatorColor="secondary"
        variant="fullWidth"
        tabIndicatorProps={{ style: { color: "red" } }}
      >
        <Tab icon={<CloudUploadOutlinedIcon />} />
        <Tab icon={<LinkOutlinedIcon />} />
        <Tab icon={<PermMediaOutlinedIcon />} />
      </Tabs>
      {/* <ButtonGroup>
        <IconButton className={classes.buttonIcon}>
          <CloudUploadOutlinedIcon />
        </IconButton>
        <IconButton className={classes.buttonIcon}>
          <LinkOutlinedIcon />
        </IconButton>
        <IconButton className={classes.buttonIcon}>
          <PermMediaOutlinedIcon />
        </IconButton>
      </ButtonGroup> */}
      <div className={classes.labelWrapper}>
        {/* {image && <img width="100%" ref={imageRef} />} */}
        <input
          id="input-file"
          accept="image/*"
          ref={inputFileRef}
          type="file"
          className={classes.input}
          // onChange={handleChangeImageFileInput}
        />
        <label htmlFor="input-file" className={classes.label}>
          <strong>Переместите сюда изображение</strong>
          <br />
          (или нажмите)
        </label>
      </div>
    </Paper>
  )
}
