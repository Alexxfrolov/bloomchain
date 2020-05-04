import React, { ReactElement } from "react"
import { RouterProvider } from "react-router5"
import { render, RenderOptions } from "@testing-library/react"
import { router } from "@features/core"

router.start()

type AllTheProvidersProps = {
  children: ReactElement
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => (
  <RouterProvider router={router}>{children}</RouterProvider>
)

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">,
) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from "@testing-library/react"

// override render method
export { customRender as render }
