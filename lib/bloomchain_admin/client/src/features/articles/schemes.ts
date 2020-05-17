import { array, date, object, string, number } from "yup"

export const ArticleCreationSchema = object().shape({
  type: string().nullable(true).required("Укажите раздел публикации"),
  status: string().nullable(true).required("Укажите статус публикации"),
  title: string().required("Укажите заголовок статьи"),
  lead: string().when("status", {
    is: (status) => ["published", "ready"].includes(status),
    then: string()
      .max(255, "Не более 255 символов")
      .required("Лид статьи не заполнен"),
    otherwise: string().max(255, "Не более 255 символов").notRequired(),
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
    keywords: array()
      .of(string())
      .when("status", {
        is: (status) => ["published", "ready"].includes(status),
        then: array().of(string()).required("Укажите ключевые слова"),
        otherwise: array().of(string()).notRequired(),
      }),
    og_type: string().notRequired(),
    og_title: string().notRequired(),
    og_description: string().max(255, "Не более 255 символов").notRequired(),
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
  cover: object()
    .nullable(true)
    .shape({
      alt: string().nullable(true).required("Укажите Alt обложке"),
      title: string().nullable(true).notRequired(),
    })
    .required("Укажите обложку статьи"),
  time: number()
    .nullable(true)
    .integer("Время прочтения не может быть дробным числом")
    .positive("Время прочтения статьи не может быть отрицательным")
    .moreThan(0, "Время прочтения статьи не может быть меньше 1 минуты")
    .notRequired(),
})
