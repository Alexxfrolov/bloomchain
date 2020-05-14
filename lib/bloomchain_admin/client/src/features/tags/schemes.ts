import { object, string } from "yup"

export const TagCreationSchema = object().shape({
  name: string().required("Имя тэга не указано"),
})
