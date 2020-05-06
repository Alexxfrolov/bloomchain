import React, { Fragment, useState, useEffect, useCallback } from "react"
import { useRoute } from "react-router5"
import {
  Container,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  makeStyles,
  createStyles,
} from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { articlesApi, Article } from "@api/articles"
import { tagsApi, Tag } from "@api/tags"
import { authorsApi, Author } from "@api/authors"
import { ArticleForm } from "@features/articles"

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
    },
  }),
)

export const ActicleEditPage = () => {
  const classes = useStyles()
  const { route } = useRoute()

  const [isDataLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(false)

  const [tags, setTags] = useState<Tag[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [article, setArticle] = useState<Omit<Article, "id">>({
    authors: [],
    body: null,
    cover: null,
    lead: null,
    inserted_at: null,
    seo_settings: {
      description: "",
      keywords: [],
      og_type: "article",
      og_title: "",
      og_description: "",
      og_image: "",
    },
    published_at: null,
    status: "draft",
    tags: [],
    time: null,
    title: "",
    total_views: 0,
    type: "newsfeed",
    updated_at: null,
  })

  const [isOpenedDialog, setOpenedDialog] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setError(false)

      try {
        const tagsResponse = await tagsApi.getAll()
        const authorsResponse = await authorsApi.getAll()
        setAuthors(authorsResponse.data.data)
        setTags(tagsResponse.data.data)
      } catch {
        setError(true)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const response = await articlesApi.getById(route.params.id)
        setArticle({
          ...response.data,
          seo_settings: {
            ...response.data.seo_settings,
            keywords: response.data.seo_settings.keywords.length
              ? response.data.seo_settings.keywords.join(", ")
              : "",
          },
        })
      } catch {
        setError(true)
      }

      setLoading(false)
    }
    fetchData()
  }, [route.params.id])

  const handleFormSubmit = useCallback(
    async (article: Article) => {
      try {
        await articlesApi.update(article)
        setOpenedDialog(true)
      } catch {
        setError(true)
      }
    },
    [setOpenedDialog, setError],
  )

  return (
    <Fragment>
      <Container maxWidth="lg" className={classes.root}>
        <Typography component="h1" variant="h4" gutterBottom={true}>
          Редактирование статьи
        </Typography>
        <Paper className={classes.paper}>
          {isDataLoading ? (
            <Skeleton width="100%" height="900px" />
          ) : (
            <ArticleForm
              initialArticle={article}
              tags={tags}
              authors={authors}
              onSubmit={handleFormSubmit}
            />
          )}
        </Paper>
      </Container>
      <SuccessDialog
        isOpened={isOpenedDialog}
        onClose={() => setOpenedDialog(false)}
      />
    </Fragment>
  )
}

type SuccessDialogProps = {
  isOpened: boolean
  onClose: () => void
}

const SuccessDialog = ({ isOpened, onClose }: SuccessDialogProps) => (
  <Dialog open={isOpened} onClose={onClose}>
    <DialogTitle>Статья успешно обновлена</DialogTitle>
    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus>
        Закрыть
      </Button>
    </DialogActions>
  </Dialog>
)
