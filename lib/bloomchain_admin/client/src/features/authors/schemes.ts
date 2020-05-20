import { object, string } from "yup"

export const AuthorCreationSchema = object().shape({
  name: string().required("Укажите имя автора"),
})
