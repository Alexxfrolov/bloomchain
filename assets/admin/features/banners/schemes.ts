import { object, string, mixed, date } from "yup"

export const BannerSchema = object().shape({
  client: string()
    .nullable(true)
    .min(1, "Минимум 1 символ")
    .required("Укажите имя клиента"),
  desktop_cover: object().shape({
    file: mixed().nullable(true).required("Загрузите файл для desktop"),
  }),
  mobile_cover: object().shape({
    file: mixed().nullable(true).required("Загрузите файл для mobile"),
  }),
  date_start: date()
    .min(new Date(), "Дата показа не может быть меньше текущей даты")
    .required("Укажите дату начала"),
  date_end: date().required("Укажите дату окончания"),
  status: mixed().nullable(true).oneOf(["active", "unactive", "waiting"]),
  updated_at: mixed().nullable(true).notRequired(),
  inserted_at: mixed().nullable(true).notRequired(),
  target_url: string().nullable(true).required("Укажите ссылку на рекламу"),
  type: mixed()
    .nullable(true)
    .oneOf(["header", "article"])
    .required("Укажите тип баннера"),
})
