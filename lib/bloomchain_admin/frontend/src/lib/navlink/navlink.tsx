import React, { MouseEventHandler, ReactNode, ReactNodeArray } from "react"
import { useRouter, BaseLink } from "react-router5"

type NavLinkProps = {
  children: ReactNode | ReactNodeArray
  routeName: string
  routeParams?: {
    [key: string]: unknown
  }
  routeOptions?: import("router5").NavigationOptions
  onClick?: MouseEventHandler<HTMLAnchorElement>
  [key: string]: any
}

export const NavLink = ({
  children,
  routeParams,
  routeName,
  ...rest
}: NavLinkProps) => {
  const router = useRouter()

  return (
    <BaseLink
      router={router}
      routeName={routeName}
      routeParams={routeParams}
      {...rest}
    >
      {children}
    </BaseLink>
  )
}
