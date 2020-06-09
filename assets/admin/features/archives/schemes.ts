import { object, mixed } from "yup"

export const ArchiveCreationSchema = object().shape({
  cover: mixed().nullable(true).required("Загрузите обложку"),
  pdf: mixed().nullable(true).required("Загрузите пдф"),
})
