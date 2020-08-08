export const mapTabNumberToBannerStatus: Record<
  number,
  import("@api/banners").Banner["status"]
> = {
  0: "active",
  1: "unactive",
  2: "waiting",
}
