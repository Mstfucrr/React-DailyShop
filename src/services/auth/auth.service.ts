import { ILogin, IRegister, IUser } from './types'
import { privateAxiosInstance, publicAxiosInstance } from '../base/base'

type LoginResponse = {
  authorization: string
  message: string
  user: IUser
}

type GetAccountResponse = {
  data: IUser
  message: string
}

const login = async (input: ILogin) => await publicAxiosInstance.post<LoginResponse>('Auths/Login', input)

const register = async (input: IRegister) => await publicAxiosInstance.post('Auths/Register', input)

const forgotPassword = async (email: string) => await publicAxiosInstance.post(`Auths/ForgotPassword?email=${email}`)

const resetPassword = async (input: any) => await privateAxiosInstance.post('Auths/ResetPassword', input)

const getAccount = async () => await privateAxiosInstance.get<GetAccountResponse>('Profiles/GetUser')

const updateAccount = async (input: FormData) =>
  await privateAxiosInstance.put('Profiles/Update', input, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

const updateAddress = async (input: any) => await privateAxiosInstance.put('Profiles/UpdateAddress', input)

const deleteAddress = async (addressId: number) =>
  await privateAxiosInstance.delete(`Profiles/DeleteAddress?addressId=${addressId}`)

const deleteAccount = async () => await privateAxiosInstance.delete('Profiles/Delete')

export const authService = {
  login,
  register,
  forgotPassword,
  resetPassword,
  updateAccount,
  deleteAccount,
  updateAddress,
  deleteAddress,
  getAccount
}
