export interface Article {
  author: string | null
  body: string | null
  cover: import("../media").MediaFile | null
  created_at: string
  description: string | null
  id: number
  keywords: string[] | null
  lead: string | null
  published_at: Date | null
  status: "published" | "draft" | "archive" | "ready"
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
  updated_at: string | null
}
