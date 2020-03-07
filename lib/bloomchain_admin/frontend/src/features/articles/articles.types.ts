export interface ArticleCover {
  file: File | null
  alt: import("@api/media").MediaFile["alt"]
  title: import("@api/media").MediaFile["title"]
  source: import("@api/media").MediaFile["source"]
  type: "image"
}
