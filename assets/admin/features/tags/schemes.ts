import { object, string } from "yup"

export const TagCreationSchema = object().shape({
  name: string().required("Укажите имя тэга"),
})
