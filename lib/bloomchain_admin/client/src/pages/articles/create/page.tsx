import React, { useState, useEffect } from "react"
import { useSnackbar } from "notistack"
import { Container, Paper, Typography, Toolbar, Box } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { articlesApi, Article } from "@api/articles"
import { tagsApi, Tag } from "@api/tags"
import { authorsApi, Author } from "@api/authors"
import { RequestStatus } from "@features/core"
import { ArticleForm } from "@features/articles"

type ActicleCreatePageState = {
  request_status: RequestStatus
  error: string | null
  tags: Tag[]
  authors: Author[]
}

export function ActicleCreatePage() {
  const { enqueueSnackbar } = useSnackbar()

  const [state, setState] = useState<ActicleCreatePageState>({
    request_status: "pending",
    error: null,
    tags: [],
    authors: [],
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
      .catch((error) => {
        setState((state) => ({ ...state, request_status: "error", error }))
        enqueueSnackbar("Произошла ошибка", {
          variant: "error",
        })
      })
  }, [enqueueSnackbar])

  const createArticle = async (article: Article) => {
    try {
      const { tags, authors, seo_settings, cover, ...rest } = article
      const data = {
        ...rest,
        authors: authors.reduce<number[]>(
          (acc, author) => [...acc, author.id],
          [],
        ),
        tags: tags.reduce<number[]>((acc, tag) => [...acc, tag.id], []),
        seo_settings: {
          ...seo_settings,
          keywords: seo_settings.keywords
            ? seo_settings.keywords.split(/[ ,]+/)
            : [],
        },
      }

      await articlesApi.create(data)
      setState((state) => ({
        ...state,
        request_status: "success",
        error: null,
      }))
      enqueueSnackbar("Статья успешно сохранена", {
        variant: "success",
      })
    } catch (error) {
      setState((state) => ({
        ...state,
        request_status: "error",
        error: error.response.statusText,
      }))
      const { errors = {} }: { errors: ServerError } = error.response.data
      enqueueSnackbar(mapServerToClientError(errors), {
        variant: "error",
      })
      return error.response.status
    }
  }

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
    </Container>
  )
}

interface ServerError {
  [key: string]: string[]
}

const mapServerToClientError = (errors: ServerError | null | undefined) => {
  if (errors) {
    return "Статья с таким заголовком уже существует"
  }

  return "Произошла ошибка"
}
