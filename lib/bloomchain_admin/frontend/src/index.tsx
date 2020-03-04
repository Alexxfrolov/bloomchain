import "react-app-polyfill/stable"
import "date-fns"

import React from "react"
import ReactDOM from "react-dom"
import createRouter from "router5"
import { RouterProvider } from "react-router5"
import browserPlugin from "router5-plugin-browser"

import { routes } from "./routes"
import { App } from "./app"

const root = document.getElementById("root")

const router = createRouter(routes)

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

const render = () => {
  if (root) {
    ReactDOM.render(
      <RouterProvider router={router}>
        <App />
      </RouterProvider>,
      root,
    )
  } else {
    throw new Error("Root element not found")
  }
}

if (typeof module.hot !== "undefined") {
  module.hot.accept("./app", render)
}

router.start(() => {
  render()
})
