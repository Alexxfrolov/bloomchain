import type { Banner } from "@api/banners"

export interface EditableBanner extends Banner {
  desktop_cover: {
    file: File | null
  } & Banner["desktop_cover"]
  mobile_cover: {
    file: File | null
  } & Banner["mobile_cover"]
}
