import { privateAxiosInstance } from '@/services/base/base'
import { IOrder } from '@/services/order/types'

interface FetchOrdersByUserIdResponse {
  data: IOrder[]
}

interface UpdateOrderStatusResponse {
  message: string
}

export const fetchOrdersByUserId = async (id: number) =>
  await privateAxiosInstance.get<FetchOrdersByUserIdResponse>(`/Orders/GetListByUserId?UserId=${id}`)

export const updateOrderStatus = async (orderId: number, status: string) =>
  await privateAxiosInstance.put<UpdateOrderStatusResponse>(`/admin/Orders/UpdateStatus/${orderId}?status=${status}`)
