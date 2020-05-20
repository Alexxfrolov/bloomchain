export type Procedure = (...args: unknown[]) => void

export function debounce<T extends Procedure>(
  func: T,
  wait = 166,
): (this: ThisParameterType<T>, ...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this

    const doLater = function () {
      timeout = undefined
      func.apply(context, args)
    }

    if (timeout !== undefined) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(doLater, wait)
  }
}
