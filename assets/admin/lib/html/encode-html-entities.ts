export function encodeHTMLEntities(str: string) {
  const p = document.createElement("p")
  p.innerHTML = str
  return p.textContent as string
}
