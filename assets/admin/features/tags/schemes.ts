import { object, string } from "yup"

export const TagSchema = object().shape({
  name: string().required("Укажите имя тэга"),
})
