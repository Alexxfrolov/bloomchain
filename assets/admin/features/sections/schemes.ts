import { object, string, number } from "yup"

const SectionSeoSettingsSchema = object().shape({
  description: string()
    .max(255, "Не более 255 символов")
    .required("Описание раздела не может быть пустым"),
  title: string()
    .max(255, "Не более 255 символов")
    .required("Заголовок страницы раздела не может быть пустым"),
})

export const SectionSchema = object().shape({
  id: number().nullable(true).notRequired(),
  name: string().required("Наименование раздела не может быть пустым"),
  seo_settings: SectionSeoSettingsSchema,
  update_at: string().nullable(true).notRequired(),
  slug: string().nullable(true).notRequired(),
  inserted_at: string().nullable(true).notRequired(),
})
