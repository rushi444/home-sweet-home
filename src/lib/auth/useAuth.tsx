import { useEffect, useState, useContext, createContext, FC } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import 'firebase/auth'

import { initFirebase } from './initFirebase'
import { removeTokenCookies, setTokenCookie } from './tokenCookies'

initFirebase()

type AuthContextType = {
  user: firebase.User | null
  logout: () => void
  authenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => null,
  authenticated: false
})

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const router = useRouter()

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => router.push('/'))
      .catch(console.error)
  }

  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged(async user => {
      if (user) {
        const token = await user.getIdToken()
        setTokenCookie(token)
        setUser(user)
      } else {
        removeTokenCookies()
        setUser(null)
      }
    })

    return () => cancelAuthListener()
  }, [])

  return (
    <AuthContext.Provider value={{ user, logout, authenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
