import React, { memo } from "react"
import { Button, Dialog, DialogTitle, DialogActions } from "@material-ui/core"

type SuccessDialogProps = {
  title: string
  isOpened: boolean
  onClose: () => void
}

export const SuccessDialog = memo(function SuccessDialog({
  title,
  isOpened,
  onClose,
}: SuccessDialogProps) {
  return (
    <Dialog open={isOpened} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  )
})
