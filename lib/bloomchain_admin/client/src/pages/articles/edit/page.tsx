import React, { useState, useEffect, useCallback } from "react"
import { useRoute } from "react-router5"
import { AxiosResponse } from "axios"
import { Container, Paper, Typography, Toolbar, Box } from "@material-ui/core"
import { articlesApi, Article } from "@api/articles"
import { tagsApi, Tag } from "@api/tags"
import { authorsApi, Author } from "@api/authors"
import { MediaFile } from "@api/media"
import { RequestStatus, SuccessDialog } from "@features/core"
import { ArticleForm, ArticleStore } from "@features/articles"

type ActicleEditPageState = {
  request_status: RequestStatus
  error: string | null
  tags: Tag[]
  authors: Author[]
  isOpenedDialog: boolean
}

export function ActicleEditPage() {
  const { route } = useRoute()

  const [state, setState] = useState<ActicleEditPageState>({
    request_status: "pending",
    error: null,
    tags: [],
    authors: [],
    isOpenedDialog: false,
  })

  const [article, setArticle] = useState<ArticleStore & { id: number }>({
    id: Number(route.params.id),
    authors: [],
    body: "",
    cover_id: null,
    lead: null,
    inserted_at: null,
    seo_settings: {
      description: null,
      keywords: null,
      og_type: "article",
      og_title: null,
      og_description: null,
    },
    published_at: null,
    status: null,
    tags: [],
    time: null,
    title: "",
    type: null,
    updated_at: null,
  })

  useEffect(() => {
    Promise.all<
      AxiosResponse<{ data: Tag[] }>,
      AxiosResponse<{ data: Author[] }>,
      AxiosResponse<Article>
    >([
      tagsApi.getAll(),
      authorsApi.getAll(),
      articlesApi.getById(route.params.id),
    ])
      .then(([tagsResponse, authorsResponse, articleResponse]) => {
        setState((state) => ({
          ...state,
          request_status: "success",
          error: null,
          tags: tagsResponse.data.data,
          authors: authorsResponse.data.data,
        }))

        const data: Partial<
          ArticleStore & { cover: MediaFile }
        > = Object.entries(articleResponse.data)
          .filter((arr) => arr.every((item) => item))
          .reduce(
            (acc, item) => Object.assign({}, acc, { [item[0]]: item[1] }),
            {},
          )

        setArticle((article) => ({
          ...article,
          ...data,
          cover_id: data.cover?.id ?? null,
        }))
      })
      .catch((error) =>
        setState((state) => ({ ...state, request_status: "error", error })),
      )
  }, [route.params.id])

  const updateArticle = useCallback(async (article: Article) => {
    try {
      await articlesApi.update(article)
      setState((state) => ({
        ...state,
        error: null,
        request_status: "success",
        isOpenedDialog: true,
      }))
    } catch (error) {
      setState((state) => ({
        ...state,
        error,
        request_status: "error",
      }))
    }
  }, [])

  return (
    <Container maxWidth="lg">
      <Paper>
        <Toolbar>
          <Typography color="inherit" variant="h6" component="h1">
            Редактирование статьи
          </Typography>
        </Toolbar>
        <Box marginLeft={3} marginRight={3}>
          {state.request_status === "success" ? (
            <ArticleForm
              initialArticle={article}
              tags={state.tags}
              authors={state.authors}
              onSubmit={updateArticle}
            />
          ) : null}
        </Box>
      </Paper>
      <SuccessDialog
        title="Статья успешно обновлена"
        isOpened={state.isOpenedDialog}
        onClose={() =>
          setState((state) => ({ ...state, isOpenedDialog: false }))
        }
      />
    </Container>
  )
}
