export interface User {
  createdAt: string
  email: string
  id: number
  job: string
  name: ""
  phone: string | null
  role: "admin" | "writer"
  updatedAt: string
}
