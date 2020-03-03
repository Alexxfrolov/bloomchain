export interface Article {
  author: string | null
  body: string
  cover?: import("../media").MediaFile[]
  created_at: string
  description: string | null
  id: number
  keywords: string[]
  lead: string | null
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
