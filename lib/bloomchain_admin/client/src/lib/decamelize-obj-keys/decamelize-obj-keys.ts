import { decamelizeKeys } from "humps"

export function decamelizeObjectKeys(
  obj: Record<string, any>,
): Record<string, any> {
  return decamelizeKeys(obj, function(key, convert, options) {
    return convert(key, options)
  })
}
