import { object, string, mixed } from "yup"

export const MediaCreationSchema = object().shape({
  file: object().nullable(false).required("Загрузите файл"),
  title: string().notRequired(),
  alt: string().when("type", {
    is: (type) => type === "image",
    then: string().required("Укажите alt изображения"),
    otherwise: mixed().notRequired(),
  }),
  source: string().notRequired(),
  type: mixed().oneOf(["image", "pdf", "video"]),
})

export const MediaEditingSchema = object().shape({
  title: string().nullable(true).notRequired(),
  alt: string().when("type", {
    is: (type) => type === "image",
    then: string().nullable(true).required("Укажите alt изображения"),
    otherwise: mixed().nullable(true).notRequired(),
  }),
  source: string().nullable(true).notRequired(),
  type: mixed().oneOf(["image", "pdf", "video"]),
})

// cover: object().when("status", {
//   is: (status) => ["published", "ready"].includes(status),
//   then: object().shape({
//     id: number().nullable(true).required("Загрузите обложку для статьи"),
//     url: string().nullable(true).required("Загрузите обложку для статьи"),
//     alt: string().nullable(true).required("Укажите Alt обложке"),
//     title: string().nullable(true).notRequired(),
//     source: string().nullable(true).notRequired(),
//     type: mixed()
//       .oneOf([null, "image", "pdf", "video"])
//       .required("Укажите тип медиа файла"),
//     inserted_at: date().nullable(true).notRequired(),
//     updated_at: date().nullable(true).notRequired(),
//   }),
//   otherwise: object().shape({
//     id: number().nullable(true).notRequired(),
//     url: string().nullable(true).notRequired(),
//     alt: string().nullable(true).notRequired(),
//     title: string().nullable(true).notRequired(),
//     source: string().nullable(true).notRequired(),
//     type: mixed().oneOf([null, "image", "pdf", "video"]).notRequired(),
//     inserted_at: date().nullable(true).notRequired(),
//     updated_at: date().nullable(true).notRequired(),
//   }),
// }),
