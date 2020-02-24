export interface Article {
  author: string
  body: string
  cover: File | null
  coverAlt: string | null
  coverSource: string | null
  coverTitle: string | null
  createdAt: string
  description: string
  updatedAt: string
  keywords: string
  lead: string
  status: "published" | "draft" | "archive"
  tags: string[]
  time: number | null
  title: string
  type:
    | "newsfeed"
    | "detailed"
    | "analysis"
    | "in_russia"
    | "calendar"
    | "person"
  userId: number
}
