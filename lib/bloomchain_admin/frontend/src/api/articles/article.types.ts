export interface Article {
  author: string
  body: string
  cover: File | null
  coverSource: string | null
  coverTitle: string | null
  coverAlt: string | null
  createdAt: string
  description: string
  keywords: string
  lead: string
  time: number | null
  status: "published" | "draft" | "archive"
  tags: string[]
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
