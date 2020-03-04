import React from "react"
import { Dialog, DialogActions, DialogTitle, Button } from "@material-ui/core"

type ErrorDialogProps = {
  opened: boolean
  onClose: () => void
}

export const ErrorDialog = ({ opened, onClose }: ErrorDialogProps) => (
  <Dialog open={opened} onClose={onClose} aria-labelledby="error-dialog-title">
    <DialogTitle id="error-dialog-title">Произошла ошибка</DialogTitle>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Закрыть
      </Button>
    </DialogActions>
  </Dialog>
)
