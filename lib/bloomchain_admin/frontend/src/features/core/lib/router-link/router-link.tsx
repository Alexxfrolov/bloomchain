import React, { forwardRef, Ref, MouseEventHandler } from "react"
import { useRouter, BaseLink } from "react-router5"

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
  ref: Ref<BaseLink>,
) {
  const { children, routeParams, routeName, ...rest } = props

  const router = useRouter()

  return (
    <BaseLink
      ref={ref}
      router={router}
      routeName={routeName}
      routeParams={routeParams}
      {...rest}
    >
      {children}
    </BaseLink>
  )
})
