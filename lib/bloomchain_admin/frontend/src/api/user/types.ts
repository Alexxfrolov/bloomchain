export interface User {
  email: string
  first_name: string
  id: number
  inserted_at: Date | string
  job: string | null
  last_name: string
  password: string | null
  phone: string | null
  role: "admin" | "writer"
  updated_at: Date | string
}
