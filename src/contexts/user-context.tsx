'use client'

import { UserType } from '@/types/user'
import { createContext, useContext, useEffect, useState } from 'react'

export interface UserContextProps {
  user: UserType | null
  signIn: (user: UserType) => void
  signOut: () => void
}

export const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null)

  async function signIn(user: UserType) {
    setUser(user)

    await localStorage.setItem('user', JSON.stringify(user))
  }

  async function signOut() {
    await localStorage.removeItem('user')

    setUser(null)
  }

  useEffect(() => {
    const loadUserData = async () => {
      const user = await localStorage.getItem('user')

      if (user) {
        setUser(JSON.parse(user))
      }
    }

    loadUserData()
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        signIn,
        signOut
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)