'use client'
import { ILogin, IUser } from '@/services/auth/types'
import { createContext, useEffect, useMemo, useState } from 'react'

// ** Axios
import { IAuthContext } from './types'
import { authService } from '@/services/auth/auth.service'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'
import { useMutation, useQuery } from '@tanstack/react-query'

export const defaultProvider: IAuthContext = {
  auth: {} as IUser,
  isAdminAuthorized: false,
  isAuthorized: false,
  loading: false,
  login: () => Promise.resolve(),
  logout: () => null,
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
  const [token, setToken] = useState<string>(defaultProvider.token)
  const router = useRouter()
  const {
    isLoading: isGetAccountLoading,
    data: getAccountData,
    isSuccess: isGetAccountSuccess
  } = useQuery({
    queryKey: ['getAccount'],
    queryFn: authService.getAccount,
    enabled: !!token
  })
  const { mutate: login, isPending: isLoginLoading } = useMutation({
    mutationFn: authService.login,
    onSuccess: data => {
      toast.success(data.data.message)
      window.localStorage.setItem('user', data.data.authorization)
      setToken(data.data.authorization)
      setUser(data.data.user)
      router.push('/')
    },
    onError: error => toast.error(error.message)
  })

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    if (storedUser) {
      const decodedToken = jwtDecode(storedUser)
      const isTokenExpired = decodedToken.exp !== undefined && decodedToken.exp < Date.now() / 1000
      if (isTokenExpired) {
        window.localStorage.removeItem('user')
        return
      }
      setToken(storedUser)
    }
  }, [])

  useEffect(() => {
    if (isGetAccountSuccess) setUser(getAccountData.data.data)
  }, [isGetAccountSuccess, getAccountData])

  const loading = useMemo(() => isGetAccountLoading || isLoginLoading, [isGetAccountLoading, isLoginLoading])

  const handleLogin = async (params: ILogin) => login(params)

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    toast.success('Çıkış yapıldı')
    router.push('/')
  }

  const providerValue = useMemo(() => {
    return {
      isAuthorized: !!user, // if user is not null, then it is authorized
      isAdminAuthorized: user?.role === 'admin',
      auth: user ?? defaultProvider.auth,
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
