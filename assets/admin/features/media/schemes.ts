import { object, string, mixed } from "yup"

export const MediaCreationSchema = object().shape({
  file: mixed().nullable(true).required("Загрузите файл"),
  title: string().notRequired(),
  alt: string().when("type", {
    is: (type) => type === "image",
    then: string().required("Укажите alt изображения"),
    otherwise: string().notRequired(),
  }),
  source: string().notRequired(),
  type: mixed().oneOf(["image", "pdf", "video"]),
})

export const MediaEditingSchema = object().shape({
  title: string().nullable(true).notRequired(),
  alt: string().when("type", {
    is: (type) => type === "image",
    then: string().nullable(true).required("Укажите alt изображения"),
    otherwise: string().nullable(true).notRequired(),
  }),
  source: string().nullable(true).notRequired(),
  type: mixed().oneOf(["image", "pdf", "video"]),
})
