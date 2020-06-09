export type ArticleStore = {
  authors: import("@api/articles").Article["authors"]
  body: string
  cover_id: number | null
  inserted_at: import("@api/articles").Article["inserted_at"]
  lead: string | null
  published_at: import("@api/articles").Article["published_at"]
  status: import("@api/articles").Article["status"] | null
  tags: import("@api/articles").Article["tags"]
  seo_settings: {
    description: string | null
    keywords: string | null
    og_type: import("@api/articles").SeoSettings["og_type"]
    og_title: string | null
    og_description: string | null
  }
  time: import("@api/articles").Article["time"]
  title: import("@api/articles").Article["title"]
  type: import("@api/articles").Article["type"] | null
  updated_at: import("@api/articles").Article["updated_at"]
}

export const article: ArticleStore = {
  authors: [],
  body: "",
  cover_id: null,
  inserted_at: null,
  lead: null,
  published_at: null,
  status: null,
  tags: [],
  seo_settings: {
    description: null,
    keywords: null,
    og_type: "article",
    og_title: null,
    og_description: null,
  },
  time: null,
  title: "",
  type: null,
  updated_at: null,
}
