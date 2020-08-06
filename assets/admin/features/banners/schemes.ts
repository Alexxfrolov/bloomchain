import { object, string, mixed, date } from "yup"

const DesktopCoverSchema = object().shape({
  file: mixed()
    .nullable(true)
    .when("url", {
      is: (url) => url !== null,
      then: mixed().nullable(true).notRequired(),
      otherwise: mixed().nullable(true).required("Загрузите файл для desktop"),
    }),
  url: string().nullable(true).notRequired(),
})

const MobileCoverSchema = object().shape({
  file: mixed()
    .nullable(true)
    .when("url", {
      is: (url) => url !== null,
      then: mixed().nullable(true).notRequired(),
      otherwise: mixed().nullable(true).required("Загрузите файл для mobile"),
    }),
  url: string().nullable(true).notRequired(),
})

export const BannerCreateSchema = object().shape({
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
  date_start: date().required("Укажите дату начала"),
  date_end: date().required("Укажите дату окончания"),
  status: mixed().nullable(true).oneOf(["active", "unactive", "waiting"]),
  updated_at: mixed().nullable(true).notRequired(),
  inserted_at: mixed().nullable(true).notRequired(),
  target_url: string()
    .url("Ссылка указана неверно")
    .nullable(true)
    .required("Укажите ссылку на рекламу"),
  type: mixed()
    .nullable(true)
    .oneOf(["header", "article"])
    .required("Укажите тип баннера"),
})

export const BannerEditSchema = object().shape({
  client: string()
    .nullable(true)
    .min(1, "Минимум 1 символ")
    .required("Укажите имя клиента"),
  desktop_cover: DesktopCoverSchema,
  mobile_cover: MobileCoverSchema,
  date_start: date().required("Укажите дату начала"),
  date_end: date().required("Укажите дату окончания"),
  status: mixed().nullable(true).oneOf(["active", "unactive", "waiting"]),
  updated_at: mixed().nullable(true).notRequired(),
  inserted_at: mixed().nullable(true).notRequired(),
  target_url: string()
    .url("Ссылка указана неверно")
    .nullable(true)
    .required("Укажите ссылку на рекламу"),
  type: mixed()
    .nullable(true)
    .oneOf(["header", "article"])
    .required("Укажите тип баннера"),
})
