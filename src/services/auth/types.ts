import { IReview } from '@/shared/types'

export interface ILogin {
  email: string
  password: string
}

export interface IRegister {
  name: string
  surname: string
  email: string
  password: string
}

export interface IUser {
  id: number
  name: string
  surname: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
  profileImage: string
  phone: string
  addresses: IUserAddress[]
  reviews: IReview[] | undefined
  status: boolean
}

export interface IUserAddress {
  id: number
  title: string
  description: string
  address: string
  city: string
  country: string
  zipCode: number
}
