export interface Pagination {
  page: number
  page_size: number
  page_size_options: number[]
  total_items: number
  total_pages: number
}

export type OrderDirection = "asc" | "desc"

export interface OrderParams<T> {
  orderDirection: OrderDirection
  orderBy: keyof T
}

export interface PaginationParams {
  page_size: number
  page: number
}
