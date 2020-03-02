export interface Article {
  id: number
  author: string
  body: string
  createdAt: string
  description: string
  updatedAt: string
  keywords: string
  lead: string
  status: "published" | "draft" | "archive"
  tags: import("../tags").Tag[]
  time: string | null
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
