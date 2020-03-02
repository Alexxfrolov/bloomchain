export interface User {
  created_at: string
  email: string
  id: number
  job: string | null
  first_name: ""
  last_name: ""
  phone: string | null
  role: "admin" | "writer"
  updated_at: string
}
