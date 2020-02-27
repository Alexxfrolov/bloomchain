export interface Article {
  id: number
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
  tags: import("../tags").Tag[]
  time: number | null
  title: string
  type:
    | "newsfeed"
    | "detailed"
    | "analysis"
    | "in_russia"
    | "calendar"
    | "person"
    | "research"
  userId: number
}
