import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
  RefObject,
  FormEvent,
  SyntheticEvent,
  ChangeEvent,
} from "react"
import { useRoute } from "react-router5"
import {
  Container,
  Paper,
  Grid,
  TextField,
  InputLabel,
  Typography,
  Select,
  FormControl,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  makeStyles,
  createStyles,
} from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import "froala-editor/js/plugins/paragraph_format.min.js"
import "froala-editor/js/plugins/lists.min.js"
import "froala-editor/js/plugins/align.min.js"
import "froala-editor/js/plugins/font_size.min.js"
import "froala-editor/js/plugins/colors.min.js"
import "froala-editor/js/plugins/link.min.js"
import "froala-editor/js/plugins/image.min.js"
import "froala-editor/js/plugins/table.min.js"
import "froala-editor/js/plugins/url.min.js"
import "froala-editor/js/plugins/quote.min.js"
import "froala-editor/js/plugins/video.min.js"
import "froala-editor/js/plugins/quick_insert.min.js"
import "froala-editor/js/plugins/image_manager.min.js"
import "froala-editor/js/third_party/embedly.min.js"
import "froala-editor/js/languages/ru.js"
import "froala-editor/css/froala_editor.pkgd.min.css"
import FroalaEditor from "react-froala-wysiwyg"
import { articlesApi, Article } from "@api/articles"
import { tagsApi, Tag } from "@api/tags"
import { mediaApi, MediaFile } from "@api/media"

const froalaEditorConfig = {
  height: 385,
  language: "ru",
  placeholderText: "",
  paragraphFormat: {
    N: "Normal",
    H1: "Heading 1",
    H2: "Heading 2",
    H3: "Heading 3",
    H4: "Heading 4",
    H5: "Heading 5",
    H6: "Heading 6",
  },
  toolbarButtons: {
    moreText: {
      buttons: [
        "bold",
        "italic",
        "underline",
        "insertLink",
        "fontSize",
        "textColor",
        "clearFormatting",
      ],
      align: "left",
      buttonsVisible: 2,
    },
    moreParagraph: {
      buttons: [
        "paragraphFormat",
        "quote",
        "alignLeft",
        "alignCenter",
        "alignRight",
        "formatUL",
      ],
      align: "left",
      buttonsVisible: 2,
    },
    moreRich: {
      buttons: ["alert", "insertTable", "insertImage", "insertVideo"],
      align: "left",
      buttonsVisible: 3,
    },
    moreMisc: {
      buttons: ["undo", "redo"],
      align: "right",
      buttonsVisible: 2,
    },
  },
  quickInsertButtons: ["image", "video", "table", "ul", "qoute"],
  imageManagerDeleteURL: "/admin/api/v1/media",
  imageManagerDeleteMethod: "DELETE",
  imageManagerLoadURL: "/admin/api/v1/media",
  imageManagerLoadParams: { type: "image" },
  imageManagerToggleTags: false,
  imageManagerDeleteParams: "",
  events: {
    "image.beforeUpload": function(images: FileList) {
      const uploadImage = async () => {
        const image = {
          file: images[0],
          type: "image",
        }
        const { data } = await mediaApi.create(image)

        this.image.insert(data.link, false, null, this.image.get())
        this.popups.hideAll()
      }

      uploadImage()

      return false
    },
    "imageManager.imagesLoaded": function(data) {
      const json = JSON.parse(data)
      return json.data.reduce((acc, image) => [...acc, { url: image.link }], [])
    },
    "imageManager.imageLoaded": function() {
      console.log("imageLoaded")
    },
    "imageManager.beforeDeleteImage": function($img) {
      // Do something before deleting an image from the image manager.
      alert("Image will be deleted.")
    },
    "imageManager.imageDeleted": function(data) {
      // Do something after the image was deleted from the image manager.
      alert("Image has been deleted.")
    },
    "imageManager.error": function(error, response) {
      console.log(arguments)
      // Bad link. One of the returned image links cannot be loaded.
      if (error.code == 10) {
      }

      // Error during request.
      else if (error.code == 11) {
      }

      // Missing imagesLoadURL option.
      else if (error.code == 12) {
      }

      // Parsing response failed.
      else if (error.code == 13) {
        console.log("error")
      }
    },
  },
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(4),
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

  const [error, setError] = useState(false)

  const [tags, setTags] = useState<Tag[]>([])
  const [article, setArticle] = useState<
    Omit<Article, "createdAt" | "updatedAt" | "keywords"> & {
      keywords: string
    }
  >({
    id: null,
    author: "",
    body: "",
    description: "",
    keywords: "",
    lead: null,
    time: null,
    status: "draft",
    tags: [],
    title: "",
    type: "newsfeed",
  })

  useEffect(() => {
    ;(async () => {
      try {
        const response = await tagsApi.get()
        setTags(response.data.data)
      } catch {
        setError(true)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const response = await articlesApi.getById(route.params.id)
        setArticle({ ...article, ...response.data })
      } catch {
        setError(true)
      }
    })()
  }, [route.params.id])

  const inputTypeLabel: RefObject<HTMLLabelElement> | null = useRef(null)
  const inputStatusLabel: RefObject<HTMLLabelElement> | null = useRef(null)
  const [typeLabelWidth, setTypeLabelWidth] = useState(0)
  const [statusLabelWidth, setStatusLabelWidth] = useState(0)

  const [openedDialog, setOpenedDialog] = useState(false)

  useEffect(() => {
    if (inputTypeLabel.current) {
      setTypeLabelWidth(inputTypeLabel.current.offsetWidth)
    }
    if (inputStatusLabel.current) {
      setStatusLabelWidth(inputStatusLabel.current.offsetWidth)
    }
  }, [])

  const fileInputRef: RefObject<HTMLInputElement> | null = useRef(null)

  const handleChangeFormField = useCallback(
    (field: string) => (event: SyntheticEvent<{ value: string }>) => {
      setArticle({ ...article, ...{ [field]: event.currentTarget.value } })
    },
    [article, setArticle],
  )

  const handleChangeEditor = useCallback(
    (value: string) => {
      setArticle({ ...article, ...{ body: value } })
    },
    [article, setArticle],
  )

  const handleChangeFileInputChange = useCallback(() => {
    if (
      fileInputRef.current &&
      fileInputRef.current.files !== null &&
      fileInputRef.current.files.length === 1
    ) {
      // const reader = new FileReader()
      // reader.onload = function(event: ProgressEvent<FileReader>) {
      //   if (imageRef.current) {
      //     event?.target?.result?.[
      //       imageRef.current.setAttribute("src", event.target.result)
      //     ]
      //   }
      // }
      // reader.readAsDataURL(fileInputRef.current.files[0])
      // setArticle({ ...article, ...{ cover: fileInputRef.current.files[0] } })
    }
  }, [article, setArticle])

  const handleChangeSelect = useCallback(
    (name: keyof Pick<Article, "type" | "status">) => (
      event: ChangeEvent<{ value: unknown }>,
    ) => {
      setArticle({
        ...article,
        [name]: event.target.value,
      })
    },
    [article, setArticle],
  )

  const handleChangeTagsSelect = useCallback(
    (event: SyntheticEvent, options: Tag[] | null) => {
      setArticle({
        ...article,
        tags: options !== null ? options.map((option) => option.id) : [],
      })
    },
    [article, setArticle],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()

      const response = await articlesApi.update(article)
      if (response.status === 200) {
        setOpenedDialog(true)
      }
    },
    [article, setOpenedDialog],
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
              <form onSubmit={handleSubmit}>
                <Grid container={true} spacing={6} alignItems="flex-start">
                  <Grid item={true} xs={9} container={true} spacing={4}>
                    <Grid item={true} xs={12}>
                      <FormControl variant="outlined" fullWidth={true}>
                        <InputLabel ref={inputTypeLabel} id="type">
                          Раздел
                        </InputLabel>
                        <Select
                          labelId="type"
                          id="type"
                          labelWidth={typeLabelWidth}
                          value={article.type}
                          onChange={handleChangeSelect("type")}
                        >
                          <MenuItem value="newsfeed">Коротко</MenuItem>
                          <MenuItem value="detailed">В Деталях</MenuItem>
                          <MenuItem value="analysis">
                            Биржевая аналитика
                          </MenuItem>
                          <MenuItem value="in_russia">Что в России</MenuItem>
                          <MenuItem value="calendar">События</MenuItem>
                          <MenuItem value="person">Персона</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item={true} xs={12}>
                      <TextField
                        id="title"
                        fullWidth={true}
                        label="Заголовок"
                        value={article.title}
                        variant="outlined"
                        onChange={handleChangeFormField("title")}
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <TextField
                        id="lead"
                        fullWidth={true}
                        label="Лид"
                        value={article.lead}
                        variant="outlined"
                        onChange={handleChangeFormField("lead")}
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <TextField
                        id="author"
                        fullWidth={true}
                        label="Автор"
                        value={article.author}
                        variant="outlined"
                        onChange={handleChangeFormField("author")}
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <Autocomplete
                        id="tags"
                        multiple={true}
                        options={tags}
                        value={article.tags}
                        disableCloseOnSelect={true}
                        getOptionLabel={(option) => option.name}
                        onChange={handleChangeTagsSelect}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Тэги"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <FroalaEditor
                        tag="textarea"
                        config={froalaEditorConfig}
                        model={article.body}
                        onModelChange={handleChangeEditor}
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <Typography
                        color="textPrimary"
                        variant="h6"
                        component="h6"
                        gutterBottom={false}
                      >
                        Мета информация
                      </Typography>
                    </Grid>
                    <Grid item={true} xs={12}>
                      <TextField
                        id="keywords"
                        label="Keywords"
                        value={article.keywords}
                        fullWidth={true}
                        variant="outlined"
                        onChange={handleChangeFormField("keywords")}
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <TextField
                        id="description"
                        label="Description"
                        value={article.description}
                        fullWidth={true}
                        variant="outlined"
                        onChange={handleChangeFormField("description")}
                      />
                    </Grid>
                  </Grid>
                  <Grid item={true} sm container={true} spacing={4}>
                    <Grid item={true} xs={12}>
                      <Typography
                        color="textPrimary"
                        variant="h6"
                        component="h6"
                        gutterBottom={true}
                      >
                        Титульное изображение
                      </Typography>
                      {article.cover && (
                        <img width="100%" src={article.cover.link} />
                      )}
                      <input
                        accept="image/*"
                        id="cover"
                        ref={fileInputRef}
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleChangeFileInputChange}
                      />
                      <label htmlFor="cover">
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                        >
                          Изменить
                        </Button>
                      </label>
                    </Grid>
                    <Grid item={true} xs={12} container={true} spacing={1}>
                      <Grid item={true} xs={12}>
                        <TextField
                          id="title"
                          label="Title"
                          value={article.cover?.title ?? ""}
                          fullWidth={true}
                          variant="outlined"
                          size="small"
                          // onChange={handleChangeCoverField("title")}
                        />
                      </Grid>
                      <Grid item={true} xs={12}>
                        <TextField
                          id="alt"
                          label="Alt"
                          value={article.cover?.alt ?? ""}
                          fullWidth={true}
                          variant="outlined"
                          size="small"
                          // onChange={handleChangeCoverField("alt")}
                        />
                      </Grid>
                      <Grid item={true} xs={12}>
                        <TextField
                          id="source"
                          label="Источник"
                          value={article.cover?.source ?? ""}
                          fullWidth={true}
                          variant="outlined"
                          size="small"
                          // onChange={handleChangeCoverField("source")}
                        />
                      </Grid>
                    </Grid>
                    <Grid item={true} xs={12}>
                      <FormControl variant="outlined" fullWidth={true}>
                        <InputLabel ref={inputStatusLabel} id="type">
                          Статус
                        </InputLabel>
                        <Select
                          labelId="status"
                          id="status"
                          labelWidth={statusLabelWidth}
                          value={article.status}
                          onChange={handleChangeSelect("status")}
                        >
                          <MenuItem value="draft">Черновик</MenuItem>
                          <MenuItem value="published">Опубликовано</MenuItem>
                          <MenuItem value="archive">Архив</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item={true} xs={12}>
                      <TextField
                        id="description"
                        label="Время прочтения"
                        type="number"
                        value={article.time ?? ""}
                        fullWidth={true}
                        variant="outlined"
                        onChange={handleChangeFormField("time")}
                      />
                    </Grid>
                  </Grid>
                  <Grid item={true} xs={12} container={true} justify="flex-end">
                    <Button variant="contained" color="primary" type="submit">
                      Обновить
                    </Button>
                  </Grid>
                </Grid>
              </form>
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
