import { mixed, array, date, object, string, number } from "yup"

export const ArticleCreationSchema = object().shape({
  type: mixed()
    .oneOf([
      null,
      "newsfeed",
      "detailed",
      "analysis",
      "in-russia",
      "calendar",
      "people",
      "research",
    ])
    .required("Укажите раздел публикации"),
  status: mixed()
    .oneOf([null, "published", "draft", "archive", "ready"])
    .required("Укажите статус публикации"),
  title: string().required("Укажите заголовок статьи"),
  lead: string().when("status", {
    is: (status) => ["published", "ready"].includes(status),
    then: string()
      .nullable(true)
      .max(255, "Не более 255 символов")
      .required("Лид статьи не заполнен"),
    otherwise: string()
      .nullable(true)
      .max(255, "Не более 255 символов")
      .notRequired(),
  }),
  body: string().when("status", {
    is: (status) => ["published", "ready"].includes(status),
    then: string().required("Тело статьи не заполнено"),
    otherwise: string().notRequired(),
  }),
  authors: array()
    .of(string())
    .when("status", {
      is: (status) => ["published", "ready"].includes(status),
      then: array().of(string()).required("Укажите авторов"),
      otherwise: array().of(string()).notRequired(),
    }),
  tags: array()
    .of(string())
    .when("status", {
      is: (status) => ["published", "ready"].includes(status),
      then: array().of(string()).required("Укажите тэги"),
      otherwise: array().of(string()).notRequired(),
    }),
  seo_settings: object().shape({
    description: string()
      .nullable(true)
      .max(255, "Не более 255 символов")
      .notRequired(),
    keywords: string().when("status", {
      is: (status) => ["published", "ready"].includes(status),
      then: string().nullable(false).required("Укажите ключевые слова"),
      otherwise: string().nullable(true).notRequired(),
    }),
    og_type: string().notRequired(),
    og_title: string().nullable(true).notRequired(),
    og_description: string()
      .nullable(true)
      .max(255, "Не более 255 символов")
      .notRequired(),
  }),
  published_at: date()
    .nullable(true)
    .when("status", {
      is: (status) => status === "ready",
      then: date()
        .min(new Date(), "Дата публикации не может быть меньше текущей даты")
        .required("Укажите дату публикации"),
      otherwise: date().notRequired(),
    }),
  cover_id: number().when("status", {
    is: (status) => ["published", "ready"].includes(status),
    then: number().nullable(true).required("Загрузите обложку для статьи"),
    otherwise: number().nullable(true).notRequired(),
  }),
  time: number()
    .nullable(true)
    .integer("Время прочтения не может быть дробным числом")
    .positive("Время прочтения статьи не может быть отрицательным")
    .moreThan(0, "Время прочтения статьи не может быть меньше 1 минуты")
    .notRequired(),
})
