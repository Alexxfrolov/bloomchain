import React from "react"
import { Dialog, DialogActions, DialogTitle, Button } from "@material-ui/core"

type ErrorDialogProps = {
  isOpened: boolean
  onClose: () => void
}

export const ErrorDialog = ({ isOpened, onClose }: ErrorDialogProps) => (
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
