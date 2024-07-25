import { IUser, IUserAddress } from '@/services/auth/types'
import { privateAxiosInstance } from '@/services/base/base'

interface FetchUsersResponse {
  data: IUser[]
}

interface BlockUserResponse {
  message: string
}

interface FetchAddressByUserIdResponse {
  data: IUserAddress[]
}

export const fetchUsers = async () => await privateAxiosInstance.get<FetchUsersResponse>(`Admin/UserSettings/Index`)

export const blockUser = async (id: number) =>
  await privateAxiosInstance.put<BlockUserResponse>(`Admin/UserSettings/${id}`)

export const fetchAddressByUserId = async (id: number) =>
  await privateAxiosInstance.get<FetchAddressByUserIdResponse>(`Profiles/GetListAddressByUserId?id=${id}`)
