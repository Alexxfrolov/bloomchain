export function throwback_by_history(event) {
  event.preventDefault()

  const has_referrer =
    typeof document !== "undefined" &&
    "referrer" in document &&
    document.referrer.length

  const has_history =
    window &&
    "history" in window &&
    typeof window.history !== "undefined" &&
    window.history !== "null"

  const is_same_origin = () => {
    return document.referrer.match(window.location.origin)
  }

  if (has_referrer && is_same_origin() && has_history) {
    return window.history.back()
  }

  return window.location.assign("/")
}
