const blobUrlsStorage = new WeakMap()

export const getBlobUrl = (blob: File) => {
  if (blobUrlsStorage.has(blob)) {
    return blobUrlsStorage.get(blob)
  }

  const url = URL.createObjectURL(blob)
  blobUrlsStorage.set(blob, url)
  return url
}
