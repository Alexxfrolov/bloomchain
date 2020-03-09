export interface Article {
  authors: import("../authors").Author[]
  body: string | null
  cover: import("../media").MediaFile | null
  created_at: Date | null
  description: string | null
  id: number
  keywords: string[]
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
  updated_at: Date | null
  url?: string | null
}
