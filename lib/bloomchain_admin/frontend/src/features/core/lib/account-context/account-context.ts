import { createContext } from "react"
import { User } from "@api/user"

export const AccountContext = createContext<User>({
  id: 1,
  email: "",
  role: "admin",
  updated_at: "",
  name: "",
  inserted_at: "",
})
