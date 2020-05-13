import { object, string } from "yup"

const EMPTY_FIELD_ERROR = "Поле не заполнено"
const INVALID_EMAIL_ERROR = "Неправильный email"

export const CreateUserSchema = object().shape({
  first_name: string().required(EMPTY_FIELD_ERROR),
  last_name: string().required(EMPTY_FIELD_ERROR),
  role: string(),
  job: string(),
  email: string().email(INVALID_EMAIL_ERROR).required(EMPTY_FIELD_ERROR),
  phone: string(),
})
