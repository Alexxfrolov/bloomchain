import { camelizeKeys } from "humps"

export function camelizeObjectKeys(
  obj: Record<string, any>,
): Record<string, any> {
  const re = /[А-я]+/
  return camelizeKeys(obj, (key: string, convert: any) =>
    re.test(key) ? key : convert(key),
  )
}
