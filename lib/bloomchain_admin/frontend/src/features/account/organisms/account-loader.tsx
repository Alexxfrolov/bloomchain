import React, { useState, useEffect, ReactChild } from "react"
import { User } from "@api/user"
import { accountApi } from "@api/account"
import { AccountContext, ErrorDialog } from "@features/core"

type AccountLoaderProps = {
  children: ReactChild | ReactChild[]
}

export const AccountLoader = ({ children }: AccountLoaderProps) => {
  const [error, setError] = useState(false)
  const [account, setAccount] = useState<User | null>(null)
  const [openedErrorDialog, setOpenedErrorDialog] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setError(false)

      try {
        const response = await accountApi.getSettings()
        setAccount(response.data)
      } catch {
        setError(true)
        setOpenedErrorDialog(true)
      }
    }
    fetchData()
  }, [])

  if (account === null) {
    return null
  }

  if (error) {
    return (
      <ErrorDialog
        opened={openedErrorDialog}
        onClose={() => setOpenedErrorDialog(false)}
      />
    )
  }

  return (
    <AccountContext.Provider value={account}>
      {children}
    </AccountContext.Provider>
  )
}
