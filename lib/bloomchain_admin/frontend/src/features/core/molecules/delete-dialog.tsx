import React from "react"
import { Dialog, DialogActions, DialogTitle, Button } from "@material-ui/core"

type DeleteDialogProps = {
  opened: boolean
  onCancel: () => void
  onConfirm: () => void
}

export const DeleteDialog = ({
  opened,
  onCancel,
  onConfirm,
}: DeleteDialogProps) => (
  <Dialog
    open={opened}
    onClose={onCancel}
    aria-labelledby="delete-dialog-title"
  >
    <DialogTitle id="delete-dialog-title">
      Вы действительно хотите удалить файл?
    </DialogTitle>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        Отменить
      </Button>
      <Button onClick={onConfirm} color="primary" autoFocus>
        Удалить
      </Button>
    </DialogActions>
  </Dialog>
)
