'use client'
import { ILogin, IUser } from '@/services/auth/types'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

// ** Axios
import { ErrCallbackType, IAuthContext } from './types'
import { authService } from '@/services/auth/auth.service'
import to from 'await-to-js'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'

export const defaultProvider: IAuthContext = {
  auth: {} as IUser,
  isAdminAuthorized: false,
  isAuthorized: false,
  loading: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  token: '',
  setToken: () => null,
  setUser: () => null
}

const AuthContext = createContext(defaultProvider)

type props = {
  children: React.ReactNode
}

const AuthProvider = ({ children }: props) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [token, setToken] = useState<string>(defaultProvider.token)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    const storedUser = window.localStorage.getItem('user')
    if (storedUser) {
      const decodedToken = jwtDecode(storedUser)
      const isTokenExpired = decodedToken.exp !== undefined && decodedToken.exp < Date.now() / 1000
      if (isTokenExpired) {
        window.localStorage.removeItem('user')
        return
      }
      console.log('storedUser', storedUser)
      setToken(storedUser)
      getAuth({ token: storedUser })
    }
    setLoading(false)
  }, [])

  const handleLogin = useCallback(async (params: ILogin, errorCallback?: ErrCallbackType) => {
    setLoading(true)
    const [err, data] = await to(authService.login(params))
    if (err) {
      errorCallback && errorCallback(err)
      setLoading(false)
      return
    }
    const { authorization, message, user } = data
    window.localStorage.setItem('user', authorization)
    setToken(authorization)
    setUser(user)
    setLoading(false)
    toast.success(message)
    router.push('/')
  }, [])

  const getAuth = useCallback(
    async ({ token }: { token: string }) => {
      setLoading(true)
      const [err, data] = await to(authService.getAccount(token))
      if (err) return toast.error(err.message)
      setUser(data.data)
      setLoading(false)
    },
    [token]
  )

  const handleLogout = useCallback(async () => {
    window.localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }, [])

  const providerValue = useMemo(() => {
    return {
      isAuthorized: !!user, // if user is not null, then it is authorized
      isAdminAuthorized: user?.role === 'admin',
      auth: user || defaultProvider.auth,
      loading: loading,
      login: handleLogin,
      logout: handleLogout,
      token: token,
      setToken: setToken,
      setUser: setUser
    }
  }, [user, loading, handleLogin, handleLogout])
  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
