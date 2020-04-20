import React, {
  Fragment,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react"
import {
  Container,
  Paper,
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
    },
  }),
)

export const ActicleCreatePage = () => {
  const classes = useStyles()

  const [isDataLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [authors, setAuthors] = useState<Author[]>([])

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(false)

    try {
      const tagsResponse = await tagsApi.getAll()
      const authorsResponse = await authorsApi.getAll()
      setTags(tagsResponse.data.data)
      setAuthors(authorsResponse.data.data)
    } catch {
      setError(true)
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const [isOpenedSuccessDialog, setOpenedSuccessDialog] = useState(false)
  const [isOpenedErrorDialog, setOpenedErrorDialog] = useState(false)

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
        <Typography component="h1" variant="h4" gutterBottom={true}>
          Создать
        </Typography>
        <Paper className={classes.paper}>
          <ArticleForm
            tags={tags}
            authors={authors}
            onSubmit={handleSubmitForm}
          />
        </Paper>
      </Container>
      <SuccessDialog
        isOpened={isOpenedSuccessDialog}
        onClose={() => setOpenedSuccessDialog(false)}
      />
      <ErrorDialog
        isOpened={isOpenedErrorDialog}
        onClose={() => setOpenedErrorDialog(false)}
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
    <DialogTitle>Статья успешно сохранена</DialogTitle>
    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus>
        Закрыть
      </Button>
    </DialogActions>
  </Dialog>
)
