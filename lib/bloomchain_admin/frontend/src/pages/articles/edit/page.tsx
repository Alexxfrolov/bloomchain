import React, { Fragment, useState, useEffect, useCallback } from "react"
import { useRoute } from "react-router5"
import {
  Container,
  Paper,
  Grid,
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
      textAlign: "left",
      color: theme.palette.text.secondary,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
  }),
)

export const ActicleEditPage = () => {
  const classes = useStyles()
  const { route } = useRoute()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [tags, setTags] = useState<Tag[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [article, setArticle] = useState<
    Omit<Article, "keywords" | "id"> & {
      keywords: string | null
    }
  >({
    authors: [],
    body: null,
    cover: null,
    created_at: null,
    description: null,
    keywords: null,
    lead: null,
    published_at: null,
    status: "draft",
    tags: [],
    time: null,
    title: "",
    type: "newsfeed",
    updated_at: null,
  })

  const [openedDialog, setOpenedDialog] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setError(false)

      try {
        const response = await tagsApi.get()
        const { data } = await authorsApi.getLatest()
        setAuthors(data.data)
        setTags(response.data.data)
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
          ...article,
          ...response.data,
          keywords: response.data.keywords.length
            ? response.data.keywords.join(", ")
            : "",
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
        <Grid container={true} spacing={3}>
          <Grid item={true} xs={12}>
            <Typography component="h1" variant="h4" gutterBottom={false}>
              Редактирование статьи
            </Typography>
          </Grid>
          <Grid item={true} xs={12}>
            <Paper className={classes.paper}>
              {loading ? (
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
          </Grid>
        </Grid>
      </Container>
      <SuccessDialog
        opened={openedDialog}
        onClose={() => setOpenedDialog(false)}
      />
    </Fragment>
  )
}

type SuccessDialogProps = {
  opened: boolean
  onClose: () => void
}

const SuccessDialog = ({ opened, onClose }: SuccessDialogProps) => (
  <Dialog open={opened} onClose={onClose}>
    <DialogTitle>Статья успешно обновлена</DialogTitle>
    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus>
        Закрыть
      </Button>
    </DialogActions>
  </Dialog>
)
