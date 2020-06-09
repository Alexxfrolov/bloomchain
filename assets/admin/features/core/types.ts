export interface HeadCell<T> {
  align?: "left" | "right" | "inherit" | "center" | "justify"
  id: string
  label: string
  sort_field?: keyof T
  width?: string
}

export type RequestStatus = "idle" | "pending" | "success" | "error"
