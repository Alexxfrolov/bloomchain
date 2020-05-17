import { object, string, mixed } from "yup"

export const UserCreationSchema = object().shape({
  first_name: string().required("Укажите имя"),
  last_name: string().required("Укажите фамилию"),
  role: mixed().oneOf(["writer", "admin"]).required("Укажите роль"),
  job: string().notRequired(),
  email: string().email("Еmail указан неверно").required("Укажите email"),
  phone: string().notRequired(),
})

export const UserEditSchema = object().shape({
  email: string().email().required("Укажите email"),
  first_name: string().required("Укажите имя"),
  job: string().nullable(true).notRequired(),
  last_name: string().required("Укажите фамилию"),
  phone: string().nullable(true).notRequired(),
})
