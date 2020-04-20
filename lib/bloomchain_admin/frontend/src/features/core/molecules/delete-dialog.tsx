import React, { memo } from "react"
import { Dialog, DialogActions, DialogTitle, Button } from "@material-ui/core"

type DeleteDialogProps = {
  isOpened: boolean
  onCancel: () => void
  onConfirm: () => void
}

export const DeleteDialog = memo(function (props: DeleteDialogProps) {
  const { isOpened, onCancel, onConfirm } = props

  return (
    <Dialog
      open={isOpened}
      onClose={onCancel}
      aria-labelledby="delete-dialog-title"
    >
      <DialogTitle id="delete-dialog-title">
        Вы действительно хотите удалить?
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
})
