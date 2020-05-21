import React from "react"
import { useSnackbar } from "notistack"
import IconButton from "@material-ui/core/IconButton"
import CloseRoundedIcon from "@material-ui/icons/CloseRounded"

type CloseNotificationsProps = {
  notificationKey: string | number
}

export function CloseNotifications(props: CloseNotificationsProps) {
  const { closeSnackbar } = useSnackbar()

  return (
    <IconButton onClick={() => closeSnackbar(props.notificationKey)}>
      <CloseRoundedIcon />
    </IconButton>
  )
}
