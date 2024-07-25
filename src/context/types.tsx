import { ILogin, IUser } from '@/services/auth/types'

export interface IAuthContext {
  isAuthorized: boolean
  isAdminAuthorized: boolean
  auth: IUser
  loading: boolean
  login: (params: ILogin, errorCallback?: ErrCallbackType) => Promise<void>
  logout: () => void
  token: string
  setToken: (token: string) => void
  setUser: (user: IUser) => void
}

export type JWTType = {
  data: IUser
  exp: number
  iat: number
}

export type ErrCallbackType = (err: any) => void
