import React, { memo } from "react"
import { Dialog, DialogActions, DialogTitle, Button } from "@material-ui/core"

type ErrorDialogProps = {
  isOpened: boolean
  onClose: () => void
}

export const ErrorDialog = memo(function ErrorDialog(props: ErrorDialogProps) {
  const { isOpened, onClose } = props
  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      aria-labelledby="error-dialog-title"
    >
      <DialogTitle id="error-dialog-title">Произошла ошибка</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  )
})
