import "react-app-polyfill/stable"

import React from "react"
import ReactDOM from "react-dom"
import { AppProviders, router } from "@features/core"

import * as serviceWorker from "./service-worker"
import { App } from "./app"

const root = document.getElementById("root")

const render = () => {
  if (root) {
    ReactDOM.render(
      <AppProviders>
        <App />
      </AppProviders>,
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
