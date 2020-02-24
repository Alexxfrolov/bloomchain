import React, { forwardRef, Ref, MouseEventHandler } from "react"
import { useRouter, BaseLink } from "react-router5"

type RouterLinkProps = {
  children: any
  routeName: string
  routeParams?: {
    [key: string]: unknown
  }
  routeOptions?: import("router5").NavigationOptions
  onClick?: MouseEventHandler<HTMLAnchorElement>
  [key: string]: any
}

export const RouterLink = forwardRef(
  (props: RouterLinkProps, ref: Ref<BaseLink>) => {
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
  },
)
