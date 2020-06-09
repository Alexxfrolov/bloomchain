export function parseHTML(string) {
  const context = document.implementation.createHTMLDocument()

  const base = context.createElement("base")
  base.href = document.location.href
  context.head.appendChild(base)

  context.body.innerHTML = string
  return context.body.children
}
