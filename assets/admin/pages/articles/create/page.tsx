import React, { useState, useEffect } from "react"
import { useSnackbar } from "notistack"
import { Container, Paper, Typography, Toolbar, Box } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { articlesApi } from "@api/articles"
import type { Article } from "@api/articles"
import { tagsApi } from "@api/tags"
import type { Tag } from "@api/tags"
import { authorsApi } from "@api/authors"
import type { Author } from "@api/authors"
import { sectionsApi } from "@api/sections"
import type { Section } from "@api/sections"
import type { RequestStatus } from "@features/core"
import { ArticleForm, ARTICLE_TYPES } from "@features/articles"

type ActicleCreatePageState = {
  request_status: RequestStatus
  error: string | null
  authors: Author[]
  sections: Section[]
  tags: Tag[]
}

export function ActicleCreatePage() {
  const { enqueueSnackbar } = useSnackbar()

  const [state, setState] = useState<ActicleCreatePageState>({
    request_status: "pending",
    error: null,
    authors: [],
    sections: [],
    tags: [],
  })

  useEffect(() => {
    Promise.all<
      AxiosResponse<{ data: Section[] }>,
      AxiosResponse<{ data: Tag[] }>,
      AxiosResponse<{ data: Author[] }>
    >([sectionsApi.getAll(), tagsApi.getAll(), authorsApi.getAll()])
      .then(([sectionsResponse, tagsResponse, authorsResponse]) =>
        setState((state) => ({
          ...state,
          request_status: "success",
          error: null,
          authors: authorsResponse.data.data,
          sections: sectionsResponse.data.data.filter((section) =>
            ARTICLE_TYPES.includes(section.slug),
          ),
          tags: tagsResponse.data.data,
        })),
      )
      .catch((error) => {
        setState((state) => ({ ...state, request_status: "error", error }))
        enqueueSnackbar("Произошла ошибка", {
          variant: "error",
        })
      })
  }, [enqueueSnackbar])

  const createArticle = async (article: Article, cb: () => void) => {
    try {
      const { tags, authors, seo_settings, ...rest } = article
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
      cb()
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
            authors={state.authors}
            sections={state.sections}
            tags={state.tags}
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
