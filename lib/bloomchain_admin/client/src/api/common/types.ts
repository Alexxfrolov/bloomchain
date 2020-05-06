export interface Pagination {
  page: number
  page_size: number
  total_items: number
  total_pages: number
}

export type Order = "asc" | "desc"

export interface OrderParams<T> {
  order: Order
  orderBy: keyof T
}

export interface PaginationParams {
  page_size: number
  page: number
}
