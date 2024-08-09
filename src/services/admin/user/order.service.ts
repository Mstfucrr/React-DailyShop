import { privateAxiosInstance } from '@/services/base/base'
import { IOrder } from '@/services/order/types'

interface FetchOrdersByUserIdResponse {
  data: IOrder[]
}

interface UpdateOrderStatusResponse {
  message: string
}

export const fetchOrdersByUserId = async (id: number) =>
  await privateAxiosInstance.get<FetchOrdersByUserIdResponse>(`/admin/Orders/${id}`)

export const updateOrderStatus = async (orderId: number, status: string) =>
  await privateAxiosInstance.put<UpdateOrderStatusResponse>(`/Orders/${orderId}`, status)
