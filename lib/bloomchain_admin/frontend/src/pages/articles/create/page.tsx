import nanoid from "nanoid"
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  RefObject,
  FormEvent,
  SyntheticEvent,
} from "react"
import {
  Container,
  Paper,
  Grid,
  TextField,
  InputLabel,
  Typography,
  Input,
  Select,
  FormControl,
  MenuItem,
  Chip,
  Button,
  makeStyles,
  useTheme,
  createStyles,
  Theme,
} from "@material-ui/core"
import "froala-editor/js/third_party/font_awesome.min.js"
import "froala-editor/js/plugins/font_family.min.js"
import "froala-editor/js/plugins/font_size.min.js"
import "froala-editor/js/plugins/help.min.js"
import "froala-editor/js/plugins/line_breaker.min.js"
import "froala-editor/js/plugins/line_height.min.js"
import "froala-editor/js/plugins/link.min.js"
import "froala-editor/js/plugins/lists.min.js"
import "froala-editor/js/plugins/paragraph_format.min.js"
import "froala-editor/js/plugins/paragraph_style.min.js"
import "froala-editor/js/plugins/quote.min.js"
import "froala-editor/js/plugins/special_characters.min.js"
import "froala-editor/js/third_party/spell_checker.min.js"
import "froala-editor/js/plugins/table.min.js"
import "froala-editor/js/plugins/url.min.js"
import "froala-editor/js/plugins/video.min.js"
import "froala-editor/js/plugins/fullscreen.min.js"
import "froala-editor/js/plugins/entities.min.js"
import "froala-editor/js/plugins/align.min.js"
import "froala-editor/js/plugins/code_view.min.js"
import "froala-editor/js/plugins/colors.min.js"
import "froala-editor/js/plugins/image.min.js"
import "froala-editor/js/plugins/image_manager.min.js"
import "froala-editor/js/froala_editor.pkgd.min.js"
import "froala-editor/js/languages/ru.js"
import "froala-editor/css/froala_style.min.css"
import "froala-editor/css/froala_editor.pkgd.min.css"
import FroalaEditor from "react-froala-wysiwyg"
import { articleApi, Article } from "@api/articles"

const tags = ["биткоин", "криптовалюта", "биржа", "рынок"]

const froalaEditorConfig = {
  height: 385,
  // language: "ru",
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
        "fontFamily",
        "fontSize",
        "textColor",
        "backgroundColor",
        "clearFormatting",
      ],
    },
    moreParagraph: {
      buttons: [
        "alignLeft",
        "alignCenter",
        "formatOLSimple",
        "alignRight",
        "alignJustify",
        "formatOL",
        "formatUL",
        "paragraphFormat",
        "paragraphStyle",
        "lineHeight",
        "outdent",
        "indent",
        "quote",
      ],
    },
    moreRich: {
      buttons: [
        "insertLink",
        "insertImage",
        "insertVideo",
        "insertTable",
        "emoticons",
        "fontAwesome",
        "specialCharacters",
        "embedly",
        "insertFile",
        "insertHR",
      ],
    },
    moreMisc: {
      buttons: [
        "undo",
        "redo",
        "fullscreen",
        "print",
        "getPDF",
        "spellChecker",
        "selectAll",
        "html",
        "help",
      ],
      align: "right",
      buttonsVisible: 2,
    },
    imageUploadURL: "/api/v1/media",
    imageUploadMethod: "POST",
    imageUploadParam: "image",
    imageMaxSize: 15 * 1024 * 1024, // 15MB.
    imageAllowedTypes: ["*"],
    fileAllowedTypes: ["*"],
  },
  events: {
    "image.beforeUpload": function(files: FileList) {
      if (files.length) {
        // Create a File Reader.
        const reader = new FileReader()

        reader.readAsDataURL(files[0])

        reader.onload = () => {
          const result = reader.result

          // this.image.upload([result])
          this.image.insert(result, null, null, this.image.get())
        }
      }

      this.popups.hideAll()

      // Stop default upload chain.
      return false
    },
  },
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
}

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
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

export const ActicleCreatePage = () => {
  const classes = useStyles()
  const theme = useTheme()

  const inputTypeLabel: RefObject<HTMLLabelElement> | null = useRef(null)
  const inputStatusLabel: RefObject<HTMLLabelElement> | null = useRef(null)
  const inputTagsLabel: RefObject<HTMLLabelElement> | null = useRef(null)
  const [typeLabelWidth, setTypeLabelWidth] = useState(0)
  const [statusLabelWidth, setStatusLabelWidth] = useState(0)
  const [tagsLabelWidth, setTagsLabelWidth] = useState(0)

  useEffect(() => {
    if (inputTypeLabel.current) {
      setTypeLabelWidth(inputTypeLabel.current.offsetWidth)
    }
    if (inputStatusLabel.current) {
      setStatusLabelWidth(inputStatusLabel.current.offsetWidth)
    }
    if (inputTagsLabel.current) {
      setTagsLabelWidth(inputTagsLabel.current.offsetWidth)
    }
  }, [])

  const fileInputRef: RefObject<HTMLInputElement> | null = useRef(null)
  const imageRef: RefObject<HTMLImageElement> | null = useRef(null)

  const [article, setArticle] = useState<Article>({
    author: "",
    body: "",
    cover: null,
    coverSource: null,
    coverTitle: null,
    coverAlt: null,
    createdAt: "",
    description: "",
    keywords: "",
    lead: "",
    time: null,
    status: "draft",
    tags: [],
    title: "",
    type: "newsfeed",
    userId: 1,
  })

  const handleChangeFormField = useCallback(
    (field: string) => (event: SyntheticEvent<{ value: string }>) => {
      setArticle({ ...article, ...{ [field]: event.target.value } })
    },
    [article, setArticle],
  )

  const handleChangeEditor = useCallback(
    (value: string) => {
      setArticle({ ...article, ...{ body: value } })
    },
    [article, setArticle],
  )

  const handleImageChange = useCallback(() => {
    if (
      fileInputRef.current &&
      fileInputRef.current.files !== null &&
      fileInputRef.current.files.length === 1
    ) {
      const reader = new FileReader()

      reader.onload = function(event: ProgressEvent<FileReader>) {
        const src = event.target.result
        if (imageRef.current) {
          src && imageRef.current.setAttribute("src", src)
        }
      }

      reader.readAsDataURL(fileInputRef.current.files[0])

      setArticle({ ...article, ...{ cover: fileInputRef.current.files[0] } })
    }
  }, [article, setArticle])

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      articleApi.create(article)
    },
    [article, articleApi],
  )

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <Typography component="h1" variant="h4" gutterBottom={false}>
            Создать
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
                        onChange={handleChangeFormField("type")}
                      >
                        <MenuItem value="newsfeed">Коротко</MenuItem>
                        <MenuItem value="detailed">В Деталях</MenuItem>
                        <MenuItem value="analysis">Биржевая аналитика</MenuItem>
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
                    <FroalaEditor
                      tag="textarea"
                      config={froalaEditorConfig}
                      model={article.body}
                      onModelChange={handleChangeEditor}
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
                    {article.cover !== null && (
                      <img
                        width="100%"
                        ref={imageRef}
                        alt="ALT"
                        title="Contemplative Reptile"
                      />
                    )}
                    <input
                      accept="image/*"
                      id="cover"
                      ref={fileInputRef}
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <label htmlFor="cover">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Upload
                      </Button>
                    </label>
                  </Grid>
                  {article.cover !== null && (
                    <Grid item={true} xs={12} container={true} spacing={1}>
                      <Grid item={true} xs={12}>
                        <TextField
                          id="source"
                          label="Image source"
                          value={article.coverSource || ""}
                          fullWidth={true}
                          variant="outlined"
                          size="small"
                          onChange={handleChangeFormField("coverSource")}
                        />
                      </Grid>
                      <Grid item={true} xs={12}>
                        <TextField
                          id="title"
                          label="Image title"
                          value={article.coverTitle || ""}
                          fullWidth={true}
                          variant="outlined"
                          size="small"
                          onChange={handleChangeFormField("coverTitle")}
                        />
                      </Grid>
                      <Grid item={true} xs={12}>
                        <TextField
                          id="alt"
                          label="Image alt"
                          value={article.coverAlt || ""}
                          fullWidth={true}
                          variant="outlined"
                          size="small"
                          onChange={handleChangeFormField("coverAlt")}
                        />
                      </Grid>
                    </Grid>
                  )}
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
                        onChange={handleChangeFormField("status")}
                      >
                        <MenuItem value="draft">Черновик</MenuItem>
                        <MenuItem value="published">Опубликовано</MenuItem>
                        <MenuItem value="archive">Архив</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item={true} xs={12}>
                    <FormControl variant="outlined" fullWidth={true}>
                      <InputLabel ref={inputTagsLabel} id="tags">
                        Тэги
                      </InputLabel>
                      <Select
                        labelId="tags"
                        multiple={true}
                        labelWidth={tagsLabelWidth}
                        value={article.tags}
                        onChange={handleChangeFormField("tags")}
                        input={<Input id="tags" />}
                        renderValue={(selected) => (
                          <div className={classes.chips}>
                            {(selected as string[]).map((value) => (
                              <Chip
                                key={value}
                                label={value}
                                className={classes.chip}
                              />
                            ))}
                          </div>
                        )}
                        MenuProps={MenuProps}
                      >
                        {tags.map((tag) => (
                          <MenuItem
                            key={nanoid()}
                            value={tag}
                            style={getStyles(tag, article.tags, theme)}
                          >
                            {tag}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item={true} xs={12}>
                    <TextField
                      id="description"
                      label="Время прочтения"
                      type="number"
                      value={article.readingTime || ""}
                      fullWidth={true}
                      variant="outlined"
                      onChange={handleChangeFormField("readingTime")}
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
                <Grid item={true} xs={12} container={true} justify="flex-end">
                  <Button variant="contained" color="primary" type="submit">
                    Сохранить
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
