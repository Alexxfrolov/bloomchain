import { object, mixed } from "yup"

export const ArchiveSchema = object().shape({
  cover: mixed().nullable(true).required("Загрузите обложку"),
  pdf: mixed().nullable(true).required("Загрузите пдф"),
})
