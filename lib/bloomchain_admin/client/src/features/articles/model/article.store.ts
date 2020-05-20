export type ArticleStore = {
  authors: import("@api/articles").Article["authors"]
  body: string
  cover: import("@api/media").MediaFile | null
  inserted_at: import("@api/articles").Article["inserted_at"]
  lead: string
  published_at: import("@api/articles").Article["published_at"]
  status: import("@api/articles").Article["status"] | null
  tags: import("@api/articles").Article["tags"]
  seo_settings: import("@api/articles").SeoSettings
  time: import("@api/articles").Article["time"]
  title: import("@api/articles").Article["title"]
  type: import("@api/articles").Article["type"] | null
  updated_at: import("@api/articles").Article["updated_at"]
}

export const article: ArticleStore = {
  authors: [],
  body: "",
  cover: null,
  inserted_at: null,
  lead: "",
  published_at: null,
  status: null,
  tags: [],
  seo_settings: {
    description: "",
    keywords: [],
    og_type: "article",
    og_title: "",
    og_description: "",
    og_image: "",
  },
  time: null,
  title: "",
  type: null,
  updated_at: null,
}
