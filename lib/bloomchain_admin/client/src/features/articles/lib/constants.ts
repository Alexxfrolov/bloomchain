export const ARTICLE_STATUSES_RECORD: Record<
  import("@api/articles").Article["status"],
  string
> = {
  draft: "Черновик",
  ready: "Готово к публикации",
  published: "Опубликовано",
  archive: "Архив",
}

export const ARTICLE_TYPES_RECORD: Record<
  import("@api/articles").Article["type"],
  string
> = {
  newsfeed: "Коротко",
  detailed: "В Деталях",
  analysis: "Биржевая аналитика",
  "in-russia": "Что в России",
  calendar: "События",
  people: "Персона",
  research: "Исследования",
}
