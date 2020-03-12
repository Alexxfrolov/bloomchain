export interface User {
  created_at: string
  email: string
  id: number
  job: string | null
  first_name: string
  last_name: string
  phone: string | null
  role: "admin" | "writer"
  updated_at: string
  password: string | null
}
