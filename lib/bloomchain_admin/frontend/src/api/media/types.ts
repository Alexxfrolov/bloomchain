export interface MediaFile {
  alt: string | null
  created_at: string
  id: number
  url: string
  source: string | null
  title: string | null
  type: "image" | "pdf" | "video"
  updated_at: string
}

export type UploadableMediaFile = {
  type: "image" | "pdf" | "video"
  title?: string | null
  alt?: string | null
  source?: string | null
  file: File
}

export type EditableMediaFile = {
  title: UploadableMediaFile["title"]
  alt: UploadableMediaFile["alt"]
  source: UploadableMediaFile["source"]
  id: MediaFile["id"]
}
