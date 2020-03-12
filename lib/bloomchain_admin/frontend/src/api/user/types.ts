export interface User {
  created_at: string
  email: string
  first_name: string
  id: number
  job: string | null
  last_name: string
  password: string | null
  phone: string | null
  role: "admin" | "writer"
  updated_at: string
}
