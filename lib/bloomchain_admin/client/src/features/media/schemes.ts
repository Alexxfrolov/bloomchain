import { object, string, mixed } from "yup"

export const MediaCreationSchema = object().shape({
  file: mixed().nullable(false).required("Загрузите файл"),
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
  title: string().notRequired(),
  alt: string().when("type", {
    is: (type) => type === "image",
    then: string().required("Укажите alt изображения"),
    otherwise: mixed().notRequired(),
  }),
  source: string().notRequired(),
  type: mixed().oneOf(["image", "pdf", "video"]),
})
