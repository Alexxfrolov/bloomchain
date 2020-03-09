import React, { Fragment, useState, useEffect, useCallback } from "react"
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  makeStyles,
  createStyles,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core"
import { articlesApi, Article } from "@api/articles"
import { tagsApi, Tag } from "@api/tags"
import { authorsApi, Author } from "@api/authors"
import { ErrorDialog } from "@features/core"
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

export const ActicleCreatePage = () => {
  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [authors, setAuthors] = useState<Author[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)

      try {
        const response = await tagsApi.get()
        const { data } = await authorsApi.getLatest()
        setTags(response.data.data)
        setAuthors(data.data)
      } catch {
        setError(true)
      }

      setLoading(false)
    }
    fetchData()
  }, [])

  const [openedSuccessDialog, setOpenedSuccessDialog] = useState(false)
  const [openedErrorDialog, setOpenedErrorDialog] = useState(false)

  const handleSubmitForm = useCallback(
    async (article: Article) => {
      try {
        await articlesApi.create(article)
        setOpenedSuccessDialog(true)
      } catch {
        setError(true)
        setOpenedErrorDialog(true)
      }
    },
    [setOpenedSuccessDialog, setError, setOpenedErrorDialog],
  )

  return (
    <Fragment>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container={true} spacing={3}>
          <Grid item={true} xs={12}>
            <Typography component="h1" variant="h4" gutterBottom={false}>
              Создать
            </Typography>
          </Grid>
          <Grid item={true} xs={12}>
            <Paper className={classes.paper}>
              <ArticleForm
                tags={tags}
                authors={authors}
                onSubmit={handleSubmitForm}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <SuccessDialog
        opened={openedSuccessDialog}
        onClose={() => setOpenedSuccessDialog(false)}
      />
      <ErrorDialog
        opened={openedErrorDialog}
        onClose={() => setOpenedErrorDialog(false)}
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
    <DialogTitle>Статья успешно сохранена</DialogTitle>
    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus>
        Закрыть
      </Button>
    </DialogActions>
  </Dialog>
)
