export interface Archive {
  cover: import("../media").MediaFile
  created_at: string
  id: number
  pdf: import("../media").MediaFile
  update_at: string | null
}
