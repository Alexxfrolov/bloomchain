import React from "react"
import { RouterProvider } from "react-router5"
import { render } from "@testing-library/react"
import { router } from "@features/core"

import { App } from "./app"

describe("<App />", () => {
  test("full app rendering/navigating", () => {
    router.start(() => {
      const { getByText } = render(
        <RouterProvider router={router}>
          <App />
        </RouterProvider>,
      )
      expect(getByText("Hello")).toBeInTheDocument()
    })
  })
})
