import React, { useState, useEffect, useCallback } from "react"
import { useRoute } from "react-router5"
import { useSnackbar } from "notistack"
import { AxiosResponse } from "axios"
import { Container, Paper, Typography, Toolbar, Box } from "@material-ui/core"
import { articlesApi } from "@api/articles"
import type { Article } from "@api/articles"
import { tagsApi } from "@api/tags"
import type { Tag } from "@api/tags"
import { authorsApi } from "@api/authors"
import type { Author } from "@api/authors"
import { sectionsApi } from "@api/sections"
import type { Section } from "@api/sections"
import type { MediaFile } from "@api/media"
import type { RequestStatus } from "@features/core"
import { ArticleForm, ARTICLE_TYPES } from "@features/articles"
import type { ArticleStore } from "@features/articles"

type ActicleEditPageState = {
  request_status: RequestStatus
  error: string | null
  authors: Author[]
  sections: Section[]
  tags: Tag[]
}

export function ActicleEditPage() {
  const { route } = useRoute()
  const { enqueueSnackbar } = useSnackbar()

  const [state, setState] = useState<ActicleEditPageState>({
    request_status: "pending",
    error: null,
    tags: [],
    authors: [],
    sections: [],
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
      AxiosResponse<{ data: Section[] }>,
      AxiosResponse<{ data: Tag[] }>,
      AxiosResponse<{ data: Author[] }>,
      AxiosResponse<Article>
    >([
      sectionsApi.getAll(),
      tagsApi.getAll(),
      authorsApi.getAll(),
      articlesApi.getById(route.params.id),
    ])
      .then(
        ([
          sectionsResponse,
          tagsResponse,
          authorsResponse,
          articleResponse,
        ]) => {
          setState((state) => ({
            ...state,
            request_status: "success",
            error: null,
            authors: authorsResponse.data.data,
            sections: sectionsResponse.data.data.filter((section) =>
              ARTICLE_TYPES.includes(section.slug),
            ),
            tags: tagsResponse.data.data,
          }))

          const {
            cover,
            ...restData
          }: Partial<ArticleStore & { cover: MediaFile }> = Object.entries(
            articleResponse.data,
          )
            .filter((arr) => arr.every((item) => item))
            .reduce(
              (acc, item) => Object.assign({}, acc, { [item[0]]: item[1] }),
              {},
            )

          setArticle((article) => ({
            ...article,
            ...restData,
            cover_id: cover?.id ?? null,
          }))
        },
      )
      .catch((error) => {
        setState((state) => ({ ...state, request_status: "error", error }))
        enqueueSnackbar("Произошла ошибка", {
          variant: "error",
        })
      })
  }, [route.params.id, enqueueSnackbar])

  const updateArticle = useCallback(
    async (article: Article) => {
      try {
        const { tags, seo_settings, authors, ...rest } = article
        const data = {
          ...rest,
          authors: authors.reduce<number[]>(
            (acc, author) => [...acc, author.id],
            [],
          ),
          tags: tags.reduce<number[]>((acc, tag) => [...acc, tag.id], []),
          seo_settings: {
            ...seo_settings,
            keywords:
              typeof seo_settings.keywords === "string"
                ? seo_settings.keywords.split(/[ ,]+/)
                : [],
          },
        }

        const {
          data: { cover, ...restArtcile },
        } = await articlesApi.update(data)
        setState((state) => ({
          ...state,
          error: null,
          request_status: "success",
        }))
        setArticle((state) => ({
          ...state,
          ...restArtcile,
          cover_id: cover?.id ?? null,
        }))
        enqueueSnackbar("Статья успешно обновлена", {
          variant: "success",
        })
      } catch (error) {
        setState((state) => ({
          ...state,
          error,
          request_status: "error",
        }))
        enqueueSnackbar("Произошла ошибка", {
          variant: "error",
        })
      }
    },
    [enqueueSnackbar],
  )

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
              authors={state.authors}
              sections={state.sections}
              tags={state.tags}
              onSubmit={updateArticle}
            />
          ) : null}
        </Box>
      </Paper>
    </Container>
  )
}
