import { object, string } from "yup"

export const AuthorSchema = object().shape({
  name: string().required("Укажите имя автора"),
})
