import createRouter from "router5"
import browserPlugin from "router5-plugin-browser"

import { routes } from "../config"

export const router = createRouter(routes)

router
  .setOption("allowNotFound", true)
  .setOption("queryParamsMode", "loose")
  .setOption("caseSensitive", true)
  .setOption("queryParams", {
    arrayFormat: "none",
    nullFormat: "string",
    booleanFormat: "string",
  })
  .setOption("defaultRoute", "articles.create")
  .usePlugin(browserPlugin())
