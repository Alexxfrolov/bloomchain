export interface Article {
  author: string
  body: string
  cover?: import("../media").MediaFile[]
  created_at: string
  description: string
  id: number
  keywords: string[]
  lead: string
  status: "published" | "draft" | "archive" | "ready"
  tags: import("../tags").Tag[]
  time: string | null
  title: string
  updated_at: string
  type:
    | "newsfeed"
    | "detailed"
    | "analysis"
    | "in_russia"
    | "calendar"
    | "person"
    | "research"
}
