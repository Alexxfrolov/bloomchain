import React, { forwardRef, Ref, MouseEventHandler, ReactNode } from "react"
import { useRouter, Link } from "react-router5"

type RouterLinkProps = {
  children: ReactNode
  routeName: string
  routeParams?: {
    [key: string]: unknown
  }
  routeOptions?: import("router5").NavigationOptions
  onClick?: MouseEventHandler<HTMLAnchorElement>
  [key: string]: unknown
}

export const RouterLink = forwardRef(function RouterLink(
  props: RouterLinkProps,
  ref: Ref<Link>,
) {
  const { children, routeParams, routeName, ...rest } = props

  const router = useRouter()

  return (
    <Link
      ref={ref}
      router={router}
      routeName={routeName}
      routeParams={routeParams}
      {...rest}
    >
      {children}
    </Link>
  )
})
