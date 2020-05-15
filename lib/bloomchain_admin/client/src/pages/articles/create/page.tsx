import React, { memo, useState, useEffect, useCallback } from "react"
import {
  Container,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Toolbar,
  Box,
} from "@material-ui/core"
import { articlesApi, Article } from "@api/articles"
import { tagsApi, Tag } from "@api/tags"
import { authorsApi, Author } from "@api/authors"
import { ErrorDialog, RequestStatus } from "@features/core"
import { ArticleForm } from "@features/articles"

type ActicleCreatePageState = {
  request_status: RequestStatus
  error: string | null
  tags: Tag[]
  authors: Author[]
  isOpenedSuccessDialog: boolean
  isOpenedErrorDialog: boolean
}

export const ActicleCreatePage = memo(() => {
  const [state, setState] = useState<ActicleCreatePageState>({
    request_status: "pending",
    error: null,
    tags: [],
    authors: [],
    isOpenedSuccessDialog: false,
    isOpenedErrorDialog: false,
  })

  useEffect(() => {
    Promise.all([tagsApi.getAll(), authorsApi.getAll()])
      .then(([tagsResponse, authorsResponse]) =>
        setState((state) => ({
          ...state,
          request_status: "success",
          error: null,
          tags: tagsResponse.data.data,
          authors: authorsResponse.data.data,
        })),
      )
      .catch((error) =>
        setState((state) => ({ ...state, request_status: "error", error })),
      )
  }, [])

  const createArticle = useCallback(async (article: Article) => {
    try {
      await articlesApi.create(article)
      setState((state) => ({
        ...state,
        request_status: "success",
        error: null,
        isOpenedSuccessDialog: true,
      }))
    } catch (error) {
      setState((state) => ({
        ...state,
        request_status: "error",
        error,
        isOpenedErrorDialog: true,
      }))
    }
  }, [])

  return (
    <Container maxWidth="lg">
      <Paper>
        <Toolbar>
          <Typography color="inherit" variant="h6" component="h6">
            Создать статью
          </Typography>
        </Toolbar>
        <Box marginLeft={3} marginRight={3}>
          <ArticleForm
            tags={state.tags}
            authors={state.authors}
            onSubmit={createArticle}
          />
        </Box>
      </Paper>
      <SuccessDialog
        isOpened={state.isOpenedSuccessDialog}
        onClose={() =>
          setState((state) => ({ ...state, isOpenedSuccessDialog: false }))
        }
      />
      <ErrorDialog
        isOpened={state.isOpenedErrorDialog}
        onClose={() =>
          setState((state) => ({ ...state, isOpenedErrorDialog: false }))
        }
      />
    </Container>
  )
})

type SuccessDialogProps = {
  isOpened: boolean
  onClose: () => void
}

const SuccessDialog = ({ isOpened, onClose }: SuccessDialogProps) => (
  <Dialog open={isOpened} onClose={onClose}>
    <DialogTitle>Статья успешно сохранена</DialogTitle>
    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus>
        Закрыть
      </Button>
    </DialogActions>
  </Dialog>
)
