import { object, string } from "yup"

export const AuthorCreationSchema = object().shape({
  name: string().required("Имя автора не указано"),
})
