export interface MediaFile {
  alt: string | null
  created_at: string
  id: number
  link: string
  source: string | null
  title: string | null
  type: "image" | "pdf" | "video"
  updated_at: string
}

export type UploadableMediaFile = {
  type: "image" | "pdf" | "video"
  title?: string
  alt?: string
  source?: string
  file: File
}
