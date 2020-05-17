import React, { memo, useState, useEffect, useCallback } from "react"
import { Container, Paper, Typography, Toolbar, Box } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { articlesApi, Article } from "@api/articles"
import { tagsApi, Tag } from "@api/tags"
import { authorsApi, Author } from "@api/authors"
import { ErrorDialog, RequestStatus } from "@features/core"
import { ArticleForm, SuccessDialog } from "@features/articles"

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
    Promise.all<
      AxiosResponse<{ data: Tag[] }>,
      AxiosResponse<{ data: Author[] }>
    >([tagsApi.getAll(), authorsApi.getAll()])
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
          <Typography color="inherit" variant="h6" component="h1">
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
        title="Статья успешно сохранена"
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
