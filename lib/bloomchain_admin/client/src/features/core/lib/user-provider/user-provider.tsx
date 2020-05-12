import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
  ReactChild,
} from "react"
import { usersApi, User } from "@api/user"

import { FullPageLoadScreen, FullPageErrorScreen } from "../../molecules"
import { RequestStatus } from "../../types"

type UserProviderProps = {
  children: ReactChild | ReactChild[]
}

type UserProviderState = {
  user: User | null
  error: Error | null
  status: RequestStatus
}

const initialState: UserProviderState = {
  user: null,
  error: null,
  status: "pending",
}

type UpdateUserFn = (user: User) => void
type RemoveUserFn = () => void

const UserContext = createContext<
  UserProviderState & {
    update: UpdateUserFn
    remove: RemoveUserFn
  }
>({ ...initialState, update: () => {}, remove: () => {} })

const UserProvider = ({ children }: UserProviderProps) => {
  const [state, setState] = useState<UserProviderState>(initialState)

  useEffect(() => {
    usersApi
      .getCurrentUser()
      .then(({ data }) =>
        setState({ status: "success", error: null, user: data }),
      )
      .catch((error: Error) => setState({ status: "error", error, user: null }))
  }, [])

  const update = useCallback((user: User) => {
    usersApi
      .update(user)
      .then(({ data }) =>
        setState({ error: null, status: "success", user: data }),
      )
      .catch((error) =>
        setState((state) => ({ ...state, error, status: "error" })),
      )
  }, [])

  const remove = useCallback(() => setState(initialState), [])

  return (
    <UserContext.Provider value={{ ...state, update, remove }}>
      {state.status === "pending" ? (
        <FullPageLoadScreen />
      ) : state.status === "error" && state.error ? (
        <FullPageErrorScreen errorMessage={state.error.message} />
      ) : (
        children
      )}
    </UserContext.Provider>
  )
}

function useCurrentUser() {
  const { user, error, status, update, remove } = useContext(UserContext)
  const isPending = status === "pending"
  const isError = status === "error"
  const isSuccess = status === "success"
  const isAuthenticated = user && isSuccess
  return {
    user,
    error,
    status,
    isPending,
    isError,
    isSuccess,
    isAuthenticated,
    update,
    remove,
  } as const
}

export { UserProvider, useCurrentUser }
