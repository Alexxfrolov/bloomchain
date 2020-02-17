import React, { Fragment, useEffect, ReactChild } from "react"
import { useSelector, useDispatch } from "react-redux"

// import { getUser } from "../user.actions"
// import { userSelector } from "../user.selectors"

type AccountLoaderProps = {
  children: ReactChild | ReactChild[] | null
}

export const AccountLoader = ({ children }: AccountLoaderProps) => {
  // const user = useSelector(userSelector)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getUser())
  // }, [dispatch, getUser])

  // if (user === null) {
  //   return null
  // }

  return <Fragment>{children}</Fragment>
}
